import { environment, F, UnExtract, UnwrapPromise } from '@libs/common';
import { BaseAggregate } from '@libs/domain/base.aggregate';
import { config_type, Prisma, PrismaClient } from '@prisma/client';

import { ClsManager } from '../manager';

export abstract class BaseRepository<T extends BaseAggregate<any>> {
  static _configMap: {
    getById(id: number): {
      id: number;
      type: config_type;
      name: string;
      description: string;
      parent_id: number | null;
      createdAt: Date;
      updatedAt: Date;
    };

    getId(type: config_type, name: string): number;
  };
  static _prismaClient: PrismaClient;

  async onModuleInit() {
    if (BaseRepository._prismaClient) {
      return;
    }

    const {
      node: { env },
      database: { username, password, host, port, name },
    } = environment;

    BaseRepository._prismaClient = new PrismaClient({
      datasourceUrl: `mysql://${username}:${password}@${host}:${port}/${name}?connection_limit=100`,
      log:
        env === 'production'
          ? []
          : [
              {
                emit: 'stdout',
                level: 'query',
              },
              {
                emit: 'stdout',
                level: 'error',
              },
              {
                emit: 'stdout',
                level: 'info',
              },
              {
                emit: 'stdout',
                level: 'warn',
              },
            ],
    });

    await BaseRepository._prismaClient.$connect();

    const configs = await BaseRepository._prismaClient.config.findMany({});
    const configIdMap = F.assoicateBy((it) => it.id, configs);

    BaseRepository._configMap = F.pipe(
      configs,
      F.groupBy((each) => each.type),
      F.mapValues(({ value }) => F.assoicateBy((each) => each.name, value)),
      (configMap) => {
        return {
          getId(type: config_type, name: string): number {
            const configId = configMap[type][name]?.id;
            if (!configId) {
              throw new Error(`invalid ${type} config. ${name}`);
            }

            return configId;
          },

          getById(id: number) {
            const config = configIdMap[id];
            if (!config) {
              throw new Error(`invalid configId. id=${id}`);
            }

            return config;
          },
        };
      },
    );
  }

  async onModuleDestroy() {
    await BaseRepository._prismaClient.$disconnect();
  }

  protected abstract clsManager: ClsManager;

  protected abstract includeAll: Record<string, any>;

  protected abstract entity(): Promise<unknown>;

  protected abstract convertToAgg(entity: UnwrapPromise<ReturnType<typeof this.entity>>): T | null;

  protected wrapPk(id: number) {
    return (id || undefined) as number;
  }

  protected wrapCondition<T>(condition: T | T[] | undefined, op: 'in' | 'notIn' = 'in') {
    if (!Array.isArray(condition)) {
      return condition as T;
    }

    return {
      [op]: F.toUnique(condition),
    };
  }

  protected get configMap() {
    return BaseRepository._configMap;
  }

  protected queryRunner<T extends UnExtract<keyof Prisma.TransactionClient, `$${string}`>>(
    entity: T,
  ): Prisma.TransactionClient[T] {
    const trx = this.clsManager.getItem('trx');
    if (trx) {
      return trx[entity];
    }

    return BaseRepository._prismaClient[entity];
  }

  protected async publishDomainEvent(agg: T, id: number) {
    return this.queryRunner('domainEvent').createMany({
      data: F.toUnique(agg.domainEvents).map((each) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        aggregate: agg.constructor.name.split('Aggregate')[0]!.toLowerCase() as any,
        aggregate_id: id,
        config_id: this.configMap.getId('domainEvent', each),
        status: 'ready',
        errorLog: null,
        processedAt: null,
        createdAt: new Date(),
      })),
    });
  }
}

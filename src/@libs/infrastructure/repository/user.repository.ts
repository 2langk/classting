import { UnwrapPromise, UserRoleEnum } from '@libs/common';
import { UserAggregate } from '@libs/domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ClsManager } from '../manager';

@Injectable()
export class UserRepository extends BaseRepository<UserAggregate> {
  constructor(protected override readonly clsManager: ClsManager) {
    super();
  }

  protected override includeAll = {
    user_role: { include: { config: true } },
  } satisfies Prisma.userInclude;

  protected override entity() {
    return this.queryRunner('user').findFirst({
      include: this.includeAll,
    });
  }

  protected override convertToAgg(entity: UnwrapPromise<ReturnType<typeof this.entity>>) {
    if (!entity) return null;

    return UserAggregate.create(
      {
        id: entity.id,
        email: entity.email,
        name: entity.name,
        password: entity.password,
        userRole: {
          id: entity.user_role[0]?.id as number, // TODO: type-safe
          type: entity.user_role[0]?.config.name as UserRoleEnum,
        },
      },
      {
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    );
  }

  async findOneById(id: number): Promise<UserAggregate | null> {
    return this.queryRunner('user')
      .findFirst({
        where: { id },
        include: this.includeAll,
      })
      .then(this.convertToAgg);
  }

  async findOneByEmail(email: string): Promise<UserAggregate | null> {
    return this.queryRunner('user')
      .findFirst({
        where: { email },
        include: this.includeAll,
      })
      .then(this.convertToAgg);
  }

  async saveOne(agg: UserAggregate): Promise<number> {
    if (agg.id !== 0) {
      await this.queryRunner('user_role').deleteMany({
        where: { user_id: agg.id },
      });

      await this.queryRunner('user').deleteMany({
        where: { id: agg.id },
      });
    }

    const entity = await this.queryRunner('user').create({
      data: {
        id: this.wrapPk(agg.id),
        name: agg.name,
        email: agg.email,
        password: agg.password,
        user_role: {
          create: {
            id: this.wrapPk(agg.userRole.id),
            config_id: this.configMap.getId('user_role', agg.userRole.type),
          },
        },
        createdAt: agg.createdAt,
        updatedAt: agg.updatedAt,
      },
    });

    await this.publishDomainEvent(agg, entity.id);

    return entity.id;
  }
}

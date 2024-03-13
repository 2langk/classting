import { rm, writeFile } from 'fs/promises';

import { entries, fromEntries, groupBy, isArray, map, pipe, reduce } from '@fxts/core';
import { environment } from '@libs/common';
import { config, config_type, PrismaClient } from '@prisma/client';

function convertToTree(configs: config[]) {
  if (configs.every((each) => each.parent_id === null)) {
    return configs.map((each) => each.name);
  }

  const configMap = configs.reduce(
    (acc, each) => {
      acc[each.id] = each;
      return acc;
    },
    {} as Record<string, config>,
  );

  const configChildrenMap = configs.reduce(
    (acc, each) => {
      if (!acc[each.parent_id || 'null']) {
        acc[each.parent_id || 'null'] = [each];
      } else {
        acc[each.parent_id || 'null']?.push(each);
      }

      return acc;
    },
    {} as Record<string, config[]>,
  );

  return configs.reduce(
    (acc, config) => {
      const children = configChildrenMap[config.id];
      if (children) {
        return acc;
      }

      const parentNames = [];

      let current = config;
      while (current.parent_id) {
        const parent = configMap[current.parent_id];
        if (!parent) throw Error(`parent not found. ${config}`);

        parentNames.push(parent.name);
        current = parent;
      }

      parentNames.reverse().reduce((nestedAcc, parentName, index) => {
        if (!nestedAcc[parentName]) {
          if (index === parentNames.length - 1) {
            nestedAcc[parentName] = [config.name];
          } else {
            nestedAcc[parentName] = {};
          }
        } else {
          if (index === parentNames.length - 1) {
            nestedAcc[parentName].push(config.name);
          }
        }

        return nestedAcc[parentName];
      }, acc);

      return acc;
    },
    {} as Record<string, any>,
  );
}

function snakeToPascal(snakeCaseString: string): string {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const camelCaseString = snakeCaseString.replace(/(\_\w)/g, (match) => match[1]!.toUpperCase());
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
}

async function bootstrap() {
  console.log('Build config enums...');

  const { username, password, host, port, name } = environment.database;

  const prismaClient = new PrismaClient({
    datasourceUrl: `mysql://${username}:${password}@${host}:${port}/${name}`,
  });

  const configMap = pipe(
    await prismaClient.config.findMany({}),
    groupBy((each) => each.type),
    entries,
    map((entry) => {
      const [key, value] = entry;
      return [key, convertToTree(value)];
    }),
    fromEntries as () => Record<config_type, string[] | Record<string, any>>,
  );

  const filePath = 'src/@libs/common/config.enum.ts';
  const text = pipe(configMap, entries, (prev) =>
    reduce(
      (acc, each) => {
        const [key, value] = each;
        if (isArray(value)) {
          return (
            acc +
            `\nexport type ${snakeToPascal(key)}Enum = 
            ${value.map((each: any) => `'${each}'`).join(' | ')};\n`
          );
        }

        return (
          acc +
          `\nexport type ${snakeToPascal(key)}Enum = 
          ${JSON.stringify(value)
            .replace(/:\s*/g, '?: ')
            .replace(/\["(.*?)"\]/g, '("$1")')
            .replace(/","/g, '" | "')};\n`
        );
      },
      `/**
        ** This file is generated by script. Do not modify manually.
        */
        
        export type AggreagteEnum = 'news' | 'school' | 'subscribe' | 'user';\n
        `,
      prev,
    ),
  );

  await rm(filePath, {}).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await writeFile(filePath, text).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
}

bootstrap();

import { execSync } from 'child_process';

import { environment } from '@libs/common';

const { username, password, host, port, name } = environment.database;

process.env['DATABASE_URL'] =
  `mysql://${username}:${password}@${host}:${port}/${name}`;

console.log('Build prisma client...');

const schemaPath = 'config/sql-history/schema.prisma';

execSync(`prisma db pull --schema=${schemaPath}`);

execSync(`prisma generate --schema=${schemaPath}`);

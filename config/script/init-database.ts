import { execSync } from 'child_process';
import { readdir } from 'fs';
import path from 'path';

import { environment } from '@libs/common';

const { username, password, host, port, name } = environment.database;

process.env['DATABASE_URL'] = `mysql://${username}:${password}@${host}:${port}/${name}`;

console.log('Initialize databse...');

const schemaPath = 'config/sql-history/schema.prisma';

execSync(`prisma db execute --file config/sql-history/drop.sql --schema=${schemaPath}`);

readdir(path.join('config/sql-history/init'), (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((each) => {
    execSync(`prisma db execute --file config/sql-history/init/${each} --schema=${schemaPath}`);
  });
});

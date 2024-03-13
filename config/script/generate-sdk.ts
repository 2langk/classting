import { execSync } from 'child_process';
import * as fs from 'fs/promises';

const bootstrap = async () => {
  console.log(`Build sdk...`);

  // 1. api
  const apiOutputPath = `src/api`;

  await fs.rm(apiOutputPath, { recursive: true }).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await fs.mkdir(apiOutputPath, { recursive: true }).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await fs.writeFile(
    `${apiOutputPath}/index.ts`,
    `
import * as api from './functional';
import { HttpError } from './HttpError';
import { IConnection } from './IConnection';
import { Primitive } from './Primitive';

export { api, HttpError, IConnection, Primitive };
`.trim(),
    'utf8',
  );

  execSync(`nestia sdk`);

  // 2. sdk
  const sdkOutputPath = `sdk`;

  await fs.rm(sdkOutputPath, { recursive: true }).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await fs.mkdir(sdkOutputPath, { recursive: true }).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });

  await fs.rm('tsconfig.sdk.json').catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await fs.writeFile(
    'tsconfig.sdk.json',
    `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "${sdkOutputPath}"
  },
  "include": [
    "${apiOutputPath}"
  ]
}
  `,
    'utf-8',
  );

  execSync('tsc -p tsconfig.sdk.json');

  // 3. swagger
  execSync('npx nestia swagger');

  // 4. clean
  await fs.rm('tsconfig.sdk.json').catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await fs.rm(`${sdkOutputPath}/tsconfig.sdk.tsbuildinfo`).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });
  await fs.rm(apiOutputPath, { recursive: true }).catch((err) => {
    if (err.code !== 'ENOENT') throw err;
  });

  execSync(`prettier --write \"${sdkOutputPath}"`);
};

bootstrap();

import { execSync } from 'child_process';

import { IConnection } from '@nestia/fetcher';

export const init = () => {
  execSync('npx tsnd --env-file=config/dotenv/.env.test config/script/init-database.ts');
};

export const connection: IConnection = {
  host: 'http://localhost:4000',
  headers: {
    authorization: ``,
  },
};

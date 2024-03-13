import { execSync } from 'child_process';

export const init = () => {
  execSync('npx tsnd --env-file=config/dotenv/.env.test config/script/init-database.ts');
};

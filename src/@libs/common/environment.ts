/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const environment = {
  tz: process.env.TZ! as string,
  node: {
    env: process.env['NODE_ENV']! as string,
  },
  database: {
    host: process.env['DATABASE_HOST']! as string,
    port: +process.env['DATABASE_PORT']! as number,
    username: process.env['DATABASE_USERNAME']! as string,
    password: process.env['DATABASE_PASSWORD']! as string,
    name: process.env['DATABASE_NAME']! as string,
  },
  jwt: {
    access: {
      secret: process.env['JWT_ACCESS_SECRET']! as string,
      expire: process.env['JWT_ACCESS_EXPIRE']! as string,
    },
  },
};

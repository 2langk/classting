'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.environment = void 0;
exports.environment = {
  tz: process.env.TZ,
  node: {
    env: process.env['NODE_ENV'],
  },
  database: {
    host: process.env['DATABASE_HOST'],
    port: +process.env['DATABASE_PORT'],
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
    name: process.env['DATABASE_NAME'],
  },
  jwt: {
    access: {
      secret: process.env['JWT_ACCESS_SECRET'],
      expire: process.env['JWT_ACCESS_EXPIRE'],
    },
  },
};
//# sourceMappingURL=environment.js.map

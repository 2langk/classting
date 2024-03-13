import { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/api',
  propagate: true,
  swagger: {
    output: 'swagger.json',
    security: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local Server',
      },
    ],
  },
};

export default config;

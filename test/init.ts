import { execSync } from 'child_process';

import { IConnection } from '@nestia/fetcher';

import { api } from './@sdk/api';

export const cleanUpDatabase = async () => {
  jest.setTimeout(30000);
  execSync('npx tsnd --env-file=config/dotenv/.env.test config/script/init-database.ts');
};

export const connection = {
  host: 'http://localhost:4000',
  headers: {
    authorization: ``,
  },
} satisfies IConnection;

export const accessTokenMap = {
  admin: [] as string[],
  student: [] as string[],
};

export const setupUser = async (count = 3) => {
  const promise = Array(count)
    .fill(0)
    .map(async (_, i) => {
      const seq = i + 1;

      await api.users.sign_up.signUpUser(connection, {
        email: `admin${seq}@test.com`,
        name: `admin${seq}`,
        password: `12341234`,
        userRole: `admin`,
      });

      await api.users.sign_up.signUpUser(connection, {
        email: `student${seq}@test.com`,
        name: `student${seq}`,
        password: `12341234`,
        userRole: `student`,
      });

      const adminSignIn = await api.users.sign_in.signInUser(connection, {
        email: `admin${seq}@test.com`,
        password: `12341234`,
      });

      if (adminSignIn.status === 201) {
        accessTokenMap.admin.push(adminSignIn.data.accessToken);
      } else {
        fail(`fail to sign in to admin`);
      }

      const studuentSignIn = await api.users.sign_in.signInUser(connection, {
        email: `student${seq}@test.com`,
        password: `12341234`,
      });

      if (studuentSignIn.status === 201) {
        accessTokenMap.student.push(studuentSignIn.data.accessToken);
      } else {
        fail(`fail to sign in to student`);
      }
    });

  await batchPromiseAll(promise);
};

export const setupSchool = async (count: number) => {
  await api.users.sign_up.signUpUser(connection, {
    email: 'setupSchoolAdmin@test.com',
    name: 'setupSchoolAdmin',
    password: '12341234',
    userRole: 'admin',
  });

  const adminSignIn = await api.users.sign_in.signInUser(connection, {
    email: 'setupSchoolAdmin@test.com',
    password: '12341234',
  });

  if (adminSignIn.status === 201) {
    connection.headers.authorization = `Bearer ${adminSignIn.data.accessToken}`;
  } else {
    fail('fail to sign in to admin');
  }

  const promises = Array(count)
    .fill(0)
    .map(() =>
      api.schools.createOneSchool(connection, {
        name: 'asd',
        region: 'asd',
      }),
    );

  await batchPromiseAll(promises);
};

/**
 * !it depends on to `setupSchool` function.
 * !should execute `setupSchool` first.
 * */
export const setupSchoolNews = async (params: { schoolIds: number[]; eachCount: number }) => {
  const adminSignIn = await api.users.sign_in.signInUser(connection, {
    email: 'setupSchoolAdmin@test.com',
    password: '12341234',
  });

  if (adminSignIn.status === 201) {
    connection.headers.authorization = `Bearer ${adminSignIn.data.accessToken}`;
  } else {
    fail('fail to sign in to admin');
  }

  const promises = params.schoolIds.flatMap((schoolId) => {
    return Array(params.eachCount)
      .fill(0)
      .map(() =>
        api.news.createOneNews(connection, {
          title: 'news-title',
          contents: 'news-content',
          schoolId,
        }),
      );
  });

  await batchPromiseAll(promises);
};

async function batchPromiseAll<T>(promises: Promise<T>[], batchSize = 10): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < promises.length; i += batchSize) {
    const batchPromises = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);
});

process.on('unhandledRejection', (error: Error) => {
  console.log(`Unhandled Rejection: ${error.message}`);
});

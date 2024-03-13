import { execSync } from 'child_process';

import { IConnection } from '@nestia/fetcher';

import { api } from './@sdk/api';

export const cleanUpDatabase = async () => {
  execSync('npx tsnd --env-file=config/dotenv/.env.test config/script/init-database.ts');
};

export const connection = {
  host: 'http://localhost:4000',
  headers: {
    authorization: ``,
  },
} satisfies IConnection;

export const accessTokenMap = {
  admin: ``,
  student: ``,
};

export const setupUser = async () => {
  await api.users.sign_up.signUpUser(connection, {
    email: 'admin1@test.com',
    name: 'admin1',
    password: '12341234',
    userRole: 'admin',
  });

  await api.users.sign_up.signUpUser(connection, {
    email: 'student1@test.com',
    name: 'student1',
    password: '12341234',
    userRole: 'student',
  });

  const adminSignIn = await api.users.sign_in.signInUser(connection, {
    email: 'admin1@test.com',
    password: '12341234',
  });

  if (adminSignIn.status === 201) {
    accessTokenMap.admin = adminSignIn.data.accessToken;
    console.log(accessTokenMap.admin);
  } else {
    fail('fail to sign in to admin');
  }

  const studuentSignIn = await api.users.sign_in.signInUser(connection, {
    email: 'student1@test.com',
    password: '12341234',
  });

  if (studuentSignIn.status === 201) {
    accessTokenMap.student = studuentSignIn.data.accessToken;
  } else {
    fail('fail to sign in to student');
  }
};

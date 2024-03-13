import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { connection, init } from 'test/init';

describe('sign-in-user', () => {
  beforeAll(async () => {
    init();

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
  });

  it('success to sign-in. (admin)', async () => {
    const res = await api.users.sign_in.signInUser(connection, {
      email: 'admin1@test.com',
      password: '12341234',
    });

    if (res.status == 201) {
      expect(res.data.accessToken).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('success to sign-in. (student)', async () => {
    const res = await api.users.sign_in.signInUser(connection, {
      email: 'student1@test.com',
      password: '12341234',
    });

    if (res.status == 201) {
      expect(res.data.accessToken).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('fail to sign-in as invalid email.', async () => {
    const res = await api.users.sign_in.signInUser(connection, {
      email: 'student99@test.com',
      password: '12341234',
    });

    if (res.status == 201) {
      fail(res.data.accessToken);
    } else {
      expect(res.data.message).toEqual('invalid email or password.');
    }
  });

  it('fail to sign-in as invalid password.', async () => {
    const res = await api.users.sign_in.signInUser(connection, {
      email: 'student1@test.com',
      password: '123412345',
    });

    if (res.status == 201) {
      fail(res.data.accessToken);
    } else {
      expect(res.data.message).toEqual('invalid email or password.');
    }
  });
});

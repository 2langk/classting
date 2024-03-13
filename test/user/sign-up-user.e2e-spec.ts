import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { cleanUpDatabase, connection } from 'test/init';

describe('sign-up-user', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
  });

  it('success to sign-up. (admin)', async () => {
    const res = await api.users.sign_up.signUpUser(connection, {
      email: 'admin1@test.com',
      name: 'admin1',
      password: '12341234',
      userRole: 'admin',
    });

    if (res.status == 201) {
      expect(res.data.id).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('success to sign-up. (student)', async () => {
    const res = await api.users.sign_up.signUpUser(connection, {
      email: 'student1@test.com',
      name: 'student1',
      password: '12341234',
      userRole: 'student',
    });

    if (res.status == 201) {
      expect(res.data.id).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('fail to sign-up as invalid email format.', async () => {
    const res = await api.users.sign_up.signUpUser(connection, {
      email: 'email.email.com',
      name: 'student1',
      password: '12341234',
      userRole: 'student',
    });

    if (res.status == 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('invalid request data.');
    }
  });

  it('fail to sign-up as duplicate email.', async () => {
    const res = await api.users.sign_up.signUpUser(connection, {
      email: 'student1@test.com',
      name: 'student1',
      password: '12341234',
      userRole: 'student',
    });

    if (res.status == 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('already email exist.');
    }
  });
});

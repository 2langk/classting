import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { connection, init } from 'test/init';

describe('get-user-me', () => {
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

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to get user me. (admin)', async () => {
    // given
    const { status, data } = await api.users.sign_in.signInUser(connection, {
      email: 'admin1@test.com',
      password: '12341234',
    });

    if (status == 400) {
      fail();
    }

    connection.headers.authorization = `Bearer ${data.accessToken}`;

    // when
    const res = await api.users.me.getUserMe(connection);

    // then
    if (res.status == 200) {
      expect(res.data.id).toBeTruthy();
      expect(res.data.name).toEqual('admin1');
      expect(res.data.userRole.type).toEqual('admin');
    } else {
      fail(res.data.message);
    }
  });

  it('success to get user me. (student)', async () => {
    // given
    const { status, data } = await api.users.sign_in.signInUser(connection, {
      email: 'student1@test.com',
      password: '12341234',
    });

    if (status == 400) {
      fail();
    }

    connection.headers.authorization = `Bearer ${data.accessToken}`;

    // when
    const res = await api.users.me.getUserMe(connection);

    // then
    if (res.status == 200) {
      expect(res.data.id).toBeTruthy();
      expect(res.data.name).toEqual('student1');
      expect(res.data.userRole.type).toEqual('student');
    } else {
      fail(res.data.message);
    }
  });

  it('fail to get user me as invalid access token.', async () => {
    // given
    const { status, data } = await api.users.sign_in.signInUser(connection, {
      email: 'student1@test.com',
      password: '12341234',
    });

    if (status == 400) {
      fail();
    }

    connection.headers.authorization = `Bearer ${data.accessToken.substring(1)}`;

    // when
    const res = await api.users.me.getUserMe(connection);

    // then
    if (res.status == 200) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('invalid access token.');
    }
  });
});

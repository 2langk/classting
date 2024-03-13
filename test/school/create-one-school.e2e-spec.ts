import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { accessTokenMap, cleanUpDatabase, connection, setupUser } from 'test/init';

describe('create-one-school', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupUser();
  });

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to create school.', async () => {
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const res = await api.schools.createOneSchool(connection, {
      name: 'test school',
      region: 'test region',
    });

    if (res.status == 201) {
      expect(res.data.id).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('fail to create school as student user.', async () => {
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    const res = await api.schools.createOneSchool(connection, {
      name: 'test school',
      region: 'test region',
    });

    if (res.status == 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('not authorized.');
    }
  });

  it('fail to create school as without access token.', async () => {
    connection.headers.authorization = ``;

    const res = await api.schools.createOneSchool(connection, {
      name: 'test school',
      region: 'test region',
    });

    if (res.status == 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('invalid access token.');
    }
  });
});

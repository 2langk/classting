import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { accessTokenMap, cleanUpDatabase, connection, setupUser } from 'test/init';

describe('create-one-news', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupUser();
  });

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to create news.', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const schoolRes = await api.schools.createOneSchool(connection, {
      name: 'test-school',
      region: 'test-region',
    });
    if (schoolRes.status === 400) {
      fail(schoolRes.data.message);
    }

    // when
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const res = await api.news.createOneNews(connection, {
      title: 'test-title',
      contents: 'test-contents',
      schoolId: schoolRes.data.id,
    });

    // then
    if (res.status == 201) {
      expect(res.data.id).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('fail to create news as another school manager.', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const schoolRes0 = await api.schools.createOneSchool(connection, {
      name: 'test-school1',
      region: 'test-region1',
    });
    if (schoolRes0.status === 400) {
      fail(schoolRes0.data.message);
    }

    connection.headers.authorization = `Bearer ${accessTokenMap.admin[1]}`;

    const schoolRes1 = await api.schools.createOneSchool(connection, {
      name: 'test-school2',
      region: 'test-region2',
    });
    if (schoolRes1.status === 400) {
      fail(schoolRes1.data.message);
    }

    // when
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[1]}`;

    const res = await api.news.createOneNews(connection, {
      title: 'test-title',
      contents: 'test-contents',
      schoolId: schoolRes0.data.id,
    });

    // then
    if (res.status == 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('permission denied.');
    }
  });

  it('fail to create news as student.', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const schoolRes = await api.schools.createOneSchool(connection, {
      name: 'test-school',
      region: 'test-region',
    });
    if (schoolRes.status === 400) {
      fail(schoolRes.data.message);
    }

    // when
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    const res = await api.news.createOneNews(connection, {
      title: 'test-title',
      contents: 'test-contents',
      schoolId: schoolRes.data.id,
    });

    // then
    if (res.status == 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('not authorized.');
    }
  });
});

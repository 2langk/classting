import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { accessTokenMap, cleanUpDatabase, connection, setupUser } from 'test/init';

describe('delete-one-news', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupUser();
  });

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to delete news.', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const schoolRes = await api.schools.createOneSchool(connection, {
      name: 'test-school',
      region: 'test-region',
    });
    if (schoolRes.status === 400) {
      fail(schoolRes.data.message);
    }

    const newsRes = await api.news.createOneNews(connection, {
      title: 'test-title',
      contents: 'test-contents',
      schoolId: schoolRes.data.id,
    });
    if (newsRes.status === 400) {
      fail(newsRes.data.message);
    }

    // when
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const res = await api.news.deleteOneNews(connection, newsRes.data.id);

    // then
    if (res.status === 200) {
      expect(res.data.id).toBe(newsRes.data.id);
    } else {
      fail(res.data.message);
    }
  });

  it('fail to delete news as news notfound.', async () => {
    // when
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const res = await api.news.deleteOneNews(connection, 10000);

    // then
    if (res.status === 200) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('news notfound.');
    }
  });

  it('fail to delete news as permission denied.', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    const schoolRes = await api.schools.createOneSchool(connection, {
      name: 'test-school',
      region: 'test-region',
    });
    if (schoolRes.status === 400) {
      fail(schoolRes.data.message);
    }

    const newsRes = await api.news.createOneNews(connection, {
      title: 'test-title',
      contents: 'test-contents',
      schoolId: schoolRes.data.id,
    });
    if (newsRes.status === 400) {
      fail(newsRes.data.message);
    }

    // when
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[1]}`;

    const res = await api.news.deleteOneNews(connection, newsRes.data.id);

    // then
    if (res.status === 200) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('permission denied.');
    }
  });
});

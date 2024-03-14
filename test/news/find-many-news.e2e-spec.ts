import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { cleanUpDatabase, connection, setupSchool, setupSchoolNews } from 'test/init';

import { F } from '@libs/common';

describe('find-many-news', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupSchool(5);
    await setupSchoolNews({ schoolIds: [1, 2, 3, 4, 5], eachCount: 20 });
  });

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to find all news.', async () => {
    const res = await api.news.findManyNews(connection, {
      schoolIds: undefined,
      cursorId: undefined,
      pageSize: 1000,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.length).toEqual(100);
      expect(res.data.news.map((each) => each.id)).toEqual(
        Array(100)
          .fill(100)
          .map((each, idx) => each - idx),
      );
    } else {
      fail(res.data.message);
    }
  });

  it('success to find school1 news.', async () => {
    const res = await api.news.findManyNews(connection, {
      schoolIds: [1],
      cursorId: undefined,
      pageSize: 100,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.length).toEqual(20);
      expect(F.toUnique(res.data.news.map((each) => each.schoolId))).toEqual([1]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find school2, school4 news.', async () => {
    const res = await api.news.findManyNews(connection, {
      schoolIds: [2, 4],
      cursorId: undefined,
      pageSize: 100,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.length).toEqual(40);
      expect(F.toUnique(res.data.news.map((each) => each.schoolId)).sort()).toEqual([2, 4]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find school3 news with pageSize.', async () => {
    const res = await api.news.findManyNews(connection, {
      schoolIds: [3],
      cursorId: undefined,
      pageSize: 10,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.length).toEqual(10);
      expect(F.toUnique(res.data.news.map((each) => each.schoolId)).sort()).toEqual([3]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find school3 news with cursorId.', async () => {
    const prevRes = await api.news.findManyNews(connection, {
      schoolIds: [3],
      cursorId: undefined,
      pageSize: 15,
      sort: 'recent',
    });

    if (prevRes.status !== 200) {
      fail(prevRes.data.message);
    }

    const res = await api.news.findManyNews(connection, {
      schoolIds: [3],
      cursorId: prevRes.data.news.at(-1)?.id,
      pageSize: 10,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.length).toEqual(5);
      expect(F.toUnique(res.data.news.map((each) => each.schoolId)).sort()).toEqual([3]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find school1,3,5 news with cursorId.', async () => {
    const prevRes = await api.news.findManyNews(connection, {
      schoolIds: [1, 3, 5],
      cursorId: undefined,
      pageSize: 50,
      sort: 'recent',
    });

    if (prevRes.status !== 200) {
      fail(prevRes.data.message);
    }

    const res = await api.news.findManyNews(connection, {
      schoolIds: [1, 3, 5],
      cursorId: prevRes.data.news.at(-1)?.id,
      pageSize: 10,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.length).toEqual(10);
    } else {
      fail(res.data.message);
    }
  });
});

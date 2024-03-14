import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { cleanUpDatabase, connection, setupSchool } from 'test/init';

describe('find-many-school', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupSchool(100);
  });

  it('success to find many school. (100..91)', async () => {
    const res = await api.schools.findManySchool(connection, {
      ids: undefined,
      cursorId: undefined,
      pageSize: 10,
    });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(10);
      expect(res.data.schools.map((each) => each.id)).toEqual([
        100, 99, 98, 97, 96, 95, 94, 93, 92, 91,
      ]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (60..51)', async () => {
    const res = await api.schools.findManySchool(connection, {
      ids: undefined,
      cursorId: 61,
      pageSize: 10,
    });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(10);
      expect(res.data.schools.map((each) => each.id)).toEqual([
        60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
      ]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (100..81)', async () => {
    const res = await api.schools.findManySchool(connection, {
      ids: undefined,
      cursorId: undefined,
      pageSize: 20,
    });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(20);
      expect(res.data.schools.map((each) => each.id)).toEqual(
        Array(20)
          .fill(100)
          .map((each, i) => each - i),
      );
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (40..21)', async () => {
    const res = await api.schools.findManySchool(connection, {
      ids: undefined,
      cursorId: 41,
      pageSize: 20,
    });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(20);
      expect(res.data.schools.map((each) => each.id)).toEqual(
        Array(20)
          .fill(40)
          .map((each, i) => each - i),
      );
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (100..20 step20)', async () => {
    const res = await api.schools.findManySchool(connection, {
      ids: [100, 80, 60, 40, 20],
      cursorId: undefined,
      pageSize: 10,
    });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(5);
      expect(res.data.schools.map((each) => each.id)).toEqual([100, 80, 60, 40, 20]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (40..20 step20)', async () => {
    const res = await api.schools.findManySchool(connection, {
      ids: [100, 80, 60, 40, 20],
      cursorId: 60,
      pageSize: 10,
    });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(2);
      expect(res.data.schools.map((each) => each.id)).toEqual([40, 20]);
    } else {
      fail(res.data.message);
    }
  });
});

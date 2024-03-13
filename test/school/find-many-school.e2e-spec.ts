import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { cleanUpDatabase, connection, setupSchool } from 'test/init';

describe('find-many-school', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupSchool(100);
  });

  it('success to find many school. (cursor === undefined, pageSize === 10)', async () => {
    const res = await api.schools.findManySchool(connection, { cursorId: undefined, pageSize: 10 });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(10);
      expect(res.data.schools.map((each) => each.id)).toEqual([
        100, 99, 98, 97, 96, 95, 94, 93, 92, 91,
      ]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (cursor === 61, pageSize === 10)', async () => {
    const res = await api.schools.findManySchool(connection, { cursorId: 61, pageSize: 10 });

    if (res.status == 200) {
      expect(res.data.schools.length).toBe(10);
      expect(res.data.schools.map((each) => each.id)).toEqual([
        60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
      ]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to find many school. (cursor === undefined, pageSize === 20)', async () => {
    const res = await api.schools.findManySchool(connection, { cursorId: undefined, pageSize: 20 });

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

  it('success to find many school. (cursor === 41, pageSize === 20)', async () => {
    const res = await api.schools.findManySchool(connection, { cursorId: 41, pageSize: 20 });

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
});

import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { accessTokenMap, cleanUpDatabase, connection, setupSchool, setupUser } from 'test/init';

describe('upsert-one-subscription', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupUser();
    await setupSchool(10);
  });

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to subscribe school.', async () => {
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    const res = await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    // then
    if (res.status === 201) {
      expect(res.data.id).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('success to subscribe & cancel school.', async () => {
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    const res = await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    // then
    if (res.status === 201) {
      expect(res.data.id).toBeTruthy();
    } else {
      fail(res.data.message);
    }
  });

  it('fail to subscribe school as school not exist.', async () => {
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    const res = await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 100,
    });

    // then
    if (res.status === 201) {
      fail(res.data.id.toString());
    } else {
      expect(res.data.message).toEqual('school notfound.');
    }
  });
});

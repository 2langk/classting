import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { accessTokenMap, cleanUpDatabase, connection, setupSchool, setupUser } from 'test/init';

describe('upsert-one-subscription', () => {
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupUser(3);
    await setupSchool(10);
  });

  afterEach(() => {
    connection.headers.authorization = ``;
  });

  it('success to get subscription list. (1)', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    // when
    const res = await api.subscriptions.me.getSubscriptionMe(connection);

    // then
    if (res.status === 200) {
      expect(res.data.schoolIds).toEqual([]);
    } else {
      fail(res.data.message);
    }
  });

  it('success to get subscription list. (2)', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 3,
    });

    // when
    const res = await api.subscriptions.me.getSubscriptionMe(connection);

    // then
    if (res.status === 200) {
      expect(res.data.schoolIds).toEqual([1, 2, 3]);
    } else {
      fail(res.data.message);
    }

    // teardown
    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 3,
    });
  });

  it('success to get subscription list (3).', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 3,
    });

    // when
    const res = await api.subscriptions.me.getSubscriptionMe(connection);

    // then
    if (res.status === 200) {
      expect(res.data.schoolIds).toEqual([3]);
    } else {
      fail(res.data.message);
    }

    // teardown
    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 3,
    });
  });

  it('success to get subscription list (4).', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.student[0]}`;

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 2,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 3,
    });

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 3,
    });

    // when
    const res = await api.subscriptions.me.getSubscriptionMe(connection);

    // then
    if (res.status === 200) {
      expect(res.data.schoolIds).toEqual([]);
    } else {
      fail(res.data.message);
    }
  });

  it('fail to get subscription list as admin user.', async () => {
    // given
    connection.headers.authorization = `Bearer ${accessTokenMap.admin[0]}`;

    await api.subscriptions.upsertOneSubscription(connection, {
      schoolId: 1,
    });

    // when
    const res = await api.subscriptions.me.getSubscriptionMe(connection);

    // then
    if (res.status === 200) {
      fail(res.data.schoolIds.toString());
    } else {
      expect(res.data.message).toEqual('not authorized.');
    }
  });
});

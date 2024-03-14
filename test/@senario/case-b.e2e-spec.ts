import { fail } from 'assert';
import { api } from 'test/@sdk/api';
import { cleanUpDatabase, connection, setupSchool, setupSchoolNews } from 'test/init';

import { F } from '@libs/common';

describe('학생은 학교 페이지를 구독하여 학교 소식을 받아볼 수 있다.', () => {
  let studentAccesToken = ``;
  beforeAll(async () => {
    await cleanUpDatabase();
    await setupSchool(5);
    await setupSchoolNews({ schoolIds: [1, 2, 3, 4, 5], eachCount: 20 });
  });

  test('학생 유저로 회원가입 및 로그인할 수 있다.', async () => {
    // 회원가입
    const signUpRes = await api.users.sign_up.signUpUser(connection, {
      email: 'student1@test.com',
      name: 'student1',
      password: '12341234',
      userRole: 'student',
    });

    if (signUpRes.status == 201) {
      expect(signUpRes.data.id).toBeTruthy();
    } else {
      fail(signUpRes.data.message);
    }

    // 로그인
    const signInRes = await api.users.sign_in.signInUser(connection, {
      email: 'student1@test.com',
      password: '12341234',
    });

    if (signInRes.status == 201) {
      expect(signInRes.data.accessToken).toBeTruthy();
      studentAccesToken = signInRes.data.accessToken;
      connection.headers.authorization = `Bearer ${studentAccesToken}`;
    } else {
      fail(signInRes.data.message);
    }

    // 자기 정보 조회
    const userMeRes = await api.users.me.getUserMe(connection);

    if (userMeRes.status === 200) {
      expect(userMeRes.data.name).toEqual('student1');
    } else {
      fail(userMeRes.data.message);
    }
  });

  test('학생은 학교 페이지를 구독할 수 있다.', async () => {
    // 구독 이전 subcsriptions/me = []
    const beforeRes = await api.subscriptions.me.getSubscriptionMe(connection);

    if (beforeRes.status === 200) {
      expect(beforeRes.data.schoolIds).toEqual([]);
    } else {
      fail(beforeRes.data.message);
    }

    // 구독하기
    const subscribeResList = await Promise.all(
      [1, 2, 3].map((schoolId) => {
        return api.subscriptions.upsertOneSubscription(connection, { schoolId });
      }),
    );

    expect(subscribeResList.map((each) => each.status).includes(400)).toBe(false);

    // 구독 이후 subcsriptions/me = [1, 2, 3]
    const afterRes = await api.subscriptions.me.getSubscriptionMe(connection);

    if (afterRes.status === 200) {
      expect(afterRes.data.schoolIds.sort()).toEqual([1, 2, 3]);
    } else {
      fail(afterRes.data.message);
    }
  });

  test('학생은 학교 페이지를 구독 취소할 수 있다.', async () => {
    // 구독 이전 subcsriptions/me = [1,2,3]
    const beforeRes = await api.subscriptions.me.getSubscriptionMe(connection);

    if (beforeRes.status === 200) {
      expect(beforeRes.data.schoolIds.sort()).toEqual([1, 2, 3]);
    } else {
      fail(beforeRes.data.message);
    }

    // 구독 취소하기
    const subscribeResList = await Promise.all(
      [1, 2].map((schoolId) => {
        return api.subscriptions.upsertOneSubscription(connection, { schoolId });
      }),
    );

    expect(subscribeResList.map((each) => each.status).includes(400)).toBe(false);

    // 구독 이후 subcsriptions/me = [3]
    const afterRes = await api.subscriptions.me.getSubscriptionMe(connection);

    if (afterRes.status === 200) {
      expect(afterRes.data.schoolIds).toEqual([3]);
    } else {
      fail(afterRes.data.message);
    }
  });

  test('학생은 구독 중인 학교 페이지 목록을 확인할 수 있다.', async () => {
    // 구독 중인 학교 ids 가져오기
    const subscriptionMeRes = await api.subscriptions.me.getSubscriptionMe(connection);

    if (subscriptionMeRes.status === 200) {
      expect(subscriptionMeRes.data.schoolIds.sort()).toEqual([3]);
    } else {
      fail(subscriptionMeRes.data.message);
    }

    // 학교 ids로 학교 목록 조회하기
    const findSchoolRes = await api.schools.findManySchool(connection, {
      ids: subscriptionMeRes.data.schoolIds,
      cursorId: undefined,
      pageSize: 10,
    });

    if (findSchoolRes.status == 200) {
      expect(findSchoolRes.data.schools.length).toBe(1);
      expect(findSchoolRes.data.schools.at(0)?.id).toEqual(3);
    } else {
      fail(findSchoolRes.data.message);
    }

    // 구독 상태 toggle
    await Promise.all(
      [1, 2, 3, 4, 5].map((schoolId) => {
        return api.subscriptions.upsertOneSubscription(connection, { schoolId });
      }),
    );

    // 다시 구독 중인 학교 ids 가져오기
    const subscriptionMeRes2 = await api.subscriptions.me.getSubscriptionMe(connection);

    if (subscriptionMeRes2.status === 200) {
      expect(subscriptionMeRes2.data.schoolIds.sort()).toEqual([1, 2, 4, 5]);
    } else {
      fail(subscriptionMeRes2.data.message);
    }

    // 다시 학교 ids로 학교 목록 조회하기
    const findSchoolRes2 = await api.schools.findManySchool(connection, {
      ids: subscriptionMeRes2.data.schoolIds,
      cursorId: undefined,
      pageSize: 10,
    });

    if (findSchoolRes2.status == 200) {
      expect(findSchoolRes2.data.schools.length).toBe(4);
      expect(findSchoolRes2.data.schools.map((each) => each.id).sort()).toEqual([1, 2, 4, 5]);
    } else {
      fail(findSchoolRes2.data.message);
    }
  });

  test('학생은 구독 중인 학교 페이지별 소식을 받아 볼 수 있다.  (최신순)', async () => {
    // 구독 중인 학교 ids 가져오기
    const subscriptionMeRes = await api.subscriptions.me.getSubscriptionMe(connection);

    if (subscriptionMeRes.status === 200) {
      expect(subscriptionMeRes.data.schoolIds.sort()).toEqual([1, 2, 4, 5]);
    } else {
      fail(subscriptionMeRes.data.message);
    }

    // 학교 소식 가져오기 (1)
    const findNewsRes = await api.news.findManyNews(connection, {
      schoolIds: [1],
      cursorId: undefined,
      pageSize: 1000,
      sort: 'recent',
    });

    if (findNewsRes.status === 200) {
      expect(findNewsRes.data.news.length).toEqual(20);
      expect(F.toUnique(findNewsRes.data.news.map((each) => each.schoolId)).sort()).toEqual([1]);
      expect(
        // check if id is desc order
        findNewsRes.data.news
          .map((each) => each.id)
          .every((each, index, origin) => {
            if (index === 0) {
              return true;
            }

            return each <= (origin.at(index - 1) || -1);
          }),
      );
    } else {
      fail(findNewsRes.data.message);
    }

    // 학교 소식 가져오기 (2)
    const findNewsRes2 = await api.news.findManyNews(connection, {
      schoolIds: [2],
      cursorId: undefined,
      pageSize: 1000,
      sort: 'recent',
    });

    if (findNewsRes2.status === 200) {
      expect(findNewsRes2.data.news.length).toEqual(20);
      expect(F.toUnique(findNewsRes2.data.news.map((each) => each.schoolId)).sort()).toEqual([2]);
      expect(
        // check if id is desc order
        findNewsRes2.data.news
          .map((each) => each.id)
          .every((each, index, origin) => {
            if (index === 0) {
              return true;
            }

            return each <= (origin.at(index - 1) || -1);
          }),
      );
    } else {
      fail(findNewsRes2.data.message);
    }
  });
});

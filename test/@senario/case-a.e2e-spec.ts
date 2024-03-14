import { api } from 'test/@sdk/api';
import { cleanUpDatabase, connection } from 'test/init';

describe('학교 관리자는 학교를 페이지를 운영하여 학교 소식을 발행할 수 있다.', () => {
  let adminAccesToken = ``;
  let adminId = 0;
  let schoolId = 0;
  let newsId = 0;
  beforeAll(async () => {
    await cleanUpDatabase();
  });

  test('관리자 유저로 회원가입 및 로그인할 수 있다.', async () => {
    const signUpRes = await api.users.sign_up.signUpUser(connection, {
      email: 'admin1@test.com',
      name: 'admin1',
      password: '12341234',
      userRole: 'admin',
    });

    if (signUpRes.status == 201) {
      expect(signUpRes.data.id).toBeTruthy();
    } else {
      fail(signUpRes.data.message);
    }

    const signInRes = await api.users.sign_in.signInUser(connection, {
      email: 'admin1@test.com',
      password: '12341234',
    });

    if (signInRes.status == 201) {
      expect(signInRes.data.accessToken).toBeTruthy();
      adminAccesToken = signInRes.data.accessToken;
      connection.headers.authorization = `Bearer ${adminAccesToken}`;
    } else {
      fail(signInRes.data.message);
    }

    const userMeRes = await api.users.me.getUserMe(connection);

    if (userMeRes.status === 200) {
      expect(userMeRes.data.name).toEqual('admin1');
      adminId = userMeRes.data.id;
    } else {
      fail(userMeRes.data.message);
    }
  });

  test('관리자 유저는 지역, 학교명으로 학교 페이지를 생성할 수 있다.', async () => {
    const createRes = await api.schools.createOneSchool(connection, {
      name: 'test school',
      region: 'test region',
    });

    if (createRes.status == 201) {
      expect(createRes.data.id).toBeTruthy();
      schoolId = createRes.data.id;
    } else {
      fail(createRes.data.message);
    }

    const findRes = await api.schools.findManySchool(connection, {
      ids: [schoolId],
      cursorId: undefined,
      pageSize: 10,
    });

    if (findRes.status == 200) {
      expect(findRes.data.schools.at(0)).toEqual({
        id: schoolId,
        name: 'test school',
        region: 'test region',
      });
    } else {
      fail(findRes.data.message);
    }
  });

  test('학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다.', async () => {
    const createRes = await api.news.createOneNews(connection, {
      title: 'test-title',
      contents: 'test-contents',
      schoolId,
    });

    if (createRes.status == 201) {
      expect(createRes.data.id).toBeTruthy();
      newsId = createRes.data.id;
    } else {
      fail(createRes.data.message);
    }

    const res = await api.news.findManyNews(connection, {
      schoolIds: [schoolId],
      cursorId: undefined,
      pageSize: 10,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.at(0)).toEqual({
        id: newsId,
        title: 'test-title',
        contents: 'test-contents',
        schoolId,
        adminId,
      });
    } else {
      fail(res.data.message);
    }
  });

  test('학교 관리자는 학교 페이지 내에 소식을 수정할 수 있다.', async () => {
    const updateRes = await api.news.updateOneNews(connection, newsId, {
      title: 'changed-test-title',
      contents: undefined,
    });

    if (updateRes.status === 200) {
      expect(updateRes.data.id).toBeTruthy();
    } else {
      fail(updateRes.data.message);
    }

    const res = await api.news.findManyNews(connection, {
      schoolIds: [schoolId],
      cursorId: undefined,
      pageSize: 10,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news.at(0)).toEqual({
        id: newsId,
        title: 'changed-test-title',
        contents: 'test-contents',
        schoolId,
        adminId,
      });
    } else {
      fail(res.data.message);
    }
  });

  test('학교 관리자는 학교 페이지 내에 소식을 삭제할 수 있다.', async () => {
    const deleteRes = await api.news.deleteOneNews(connection, newsId);

    if (deleteRes.status === 200) {
      expect(deleteRes.data.id).toBeTruthy();
    } else {
      fail(deleteRes.data.message);
    }

    const res = await api.news.findManyNews(connection, {
      schoolIds: [schoolId],
      cursorId: undefined,
      pageSize: 10,
      sort: 'recent',
    });

    if (res.status === 200) {
      expect(res.data.news).toEqual([]);
    } else {
      fail(res.data.message);
    }
  });
});

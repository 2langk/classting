import { api, IConnection } from 'test/@sdk/api';

const connection: IConnection = {
  host: 'http://localhost:4000',
};

describe('test', () => {
  it('asd', async () => {
    const res = await api.users.sign_up.signUpUser(connection, {
      email: 'test@test.com',
      name: 'test',
      password: '12341234',
      userRole: 'admin',
    });

    console.log(res.data);
  });
});

import { anything, when } from 'ts-mockito';

import { UserAggregate } from '@libs/domain';
import { UserRepository } from '@libs/infrastructure/repository';
import { UnitTestBuilder } from '@libs/test';

import { SignUpUserPort } from './sign-up-user.port';
import { SignUpUserData, SignUpUserException } from './sign-up-user.type';

describe('sign-up-user', () => {
  const {
    injector: port,
    mocks: [mockUserRepository],
  } = UnitTestBuilder.setInjector(SignUpUserPort).setMocks(UserRepository).build();

  it(`success to signup. (admin)`, async () => {
    // given
    const data: SignUpUserData = {
      email: 'test@test.com',
      name: 'test',
      password: 'string',
      userRole: 'admin',
    };

    when(mockUserRepository.findOneByEmail(data.email)).thenResolve(null);
    when(mockUserRepository.saveOne(anything())).thenResolve(999);

    // when
    const result = await port.execute(data);

    // then
    expect(result.id).toEqual(999);
  });

  it(`fail to signup as email duplicated`, async () => {
    // given
    const data: SignUpUserData = {
      email: 'test@test.com',
      name: 'test',
      password: 'string',
      userRole: 'admin',
    };

    when(mockUserRepository.findOneByEmail(data.email)).thenResolve(
      UserAggregate.create({
        ...data,
        id: 1234,
        userRole: { id: 56, type: 'admin' },
      }),
    );
    when(mockUserRepository.saveOne(anything())).thenResolve(999);

    // when
    const result: SignUpUserException = await port.execute(data).catch((err) => err);

    // then
    expect(result.message).toEqual('already email exist.');
  });
});

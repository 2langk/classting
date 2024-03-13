import { Auth } from '@libs/middleware/auth.guard';
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

import { GetUserMeException, GetUserMePort, GetUserMeView } from './get-user-me';
import {
  SignInUserData,
  SignInUserException,
  SignInUserPort,
  SignInUserView,
} from './sign-in-user';
import {
  SignUpUserData,
  SignUpUserException,
  SignUpUserPort,
  SignUpUserView,
} from './sign-up-user';

@Controller('/users')
export class UserController {
  constructor(
    private readonly signUpUserPort: SignUpUserPort,
    private readonly signInUserPort: SignInUserPort,
    private readonly getUserMePort: GetUserMePort,
  ) {}

  /**
   * 회원가입하기.
   * - email은 중복 불가합니다.
   *
   * @tag User
   *
   * @param data 회원가입에 필요한 정보
   *
   * @return 유저 id
   */
  @Auth('public')
  @TypedException<SignUpUserException>(400)
  @TypedRoute.Post('/sign-up')
  async signUpUser(@TypedBody() data: SignUpUserData): Promise<SignUpUserView> {
    return this.signUpUserPort.execute(data);
  }

  /**
   * 로그인하기.
   * - 인증에 성공하면 jwt를 받습니다.
   * - 앞으로, Bearer {accessToken} 형식으로 유저를 인증합니다.
   *
   * @tag User
   *
   * @param data 이메일, 비밀번호
   *
   * @return 엑세스 토큰
   */
  @Auth('public')
  @TypedException<SignInUserException>(400)
  @TypedRoute.Post('/sign-in')
  async signInUser(@TypedBody() data: SignInUserData): Promise<SignInUserView> {
    return this.signInUserPort.execute(data);
  }

  /**
   * 자기 정보 가져오기.
   * - 요청에 accessToken이 있어야 접근 가능합니다.
   *
   * @tag User
   *
   * @security bearer
   *
   * @return 유저 정보
   */
  @Auth('admin', 'student')
  @TypedException<GetUserMeException>(400)
  @TypedRoute.Get('/me')
  async getUserMe(): Promise<GetUserMeView> {
    return this.getUserMePort.execute();
  }
}

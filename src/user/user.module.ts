import { Module } from '@nestjs/common';

import { GetUserMePort } from './get-user-me';
import { SignInUserPort } from './sign-in-user';
import { SignUpUserPort } from './sign-up-user';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [SignUpUserPort, SignInUserPort, GetUserMePort],
})
export class UserModule {}

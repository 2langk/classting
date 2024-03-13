import { AppException } from '@libs/common';
import { tags } from 'typia';

export interface SignInUserData {
  email: string & tags.Format<'email'>;
  password: string;
}

export interface SignInUserView {
  accessToken: string;
}

export class SignInUserException extends AppException<'invalid email or password.'> {}

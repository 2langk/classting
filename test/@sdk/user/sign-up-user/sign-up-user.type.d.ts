import { tags } from 'typia';
import { AppException, UnExtract, UserRoleEnum } from '@libs/common';
export interface SignUpUserData {
  email: string & tags.Format<'email'>;
  password: string;
  name: string;
  userRole: UnExtract<UserRoleEnum, 'operator'>;
}
export interface SignUpUserView {
  id: number;
}
export declare class SignUpUserException extends AppException<'already email exist.'> {}

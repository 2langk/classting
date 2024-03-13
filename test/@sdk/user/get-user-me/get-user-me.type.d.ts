import { AppException, UserRoleEnum } from '@libs/common';
export interface GetUserMeView {
  id: number;
  name: string;
  userRole: {
    id: number;
    type: UserRoleEnum;
  };
}
export declare class GetUserMeException extends AppException<'user notfound.'> {}

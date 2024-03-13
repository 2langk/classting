import { AppException, UserRoleEnum } from '@libs/common';

// export interface GetUserMeData {}

export interface GetUserMeView {
  id: number;
  name: string;
  userRole: {
    id: number;
    type: UserRoleEnum;
  };
}

export class GetUserMeException extends AppException<'user notfound.'> {}

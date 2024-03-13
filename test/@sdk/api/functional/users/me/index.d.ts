import type { IConnection, IPropagation } from '@nestia/fetcher';
import type {
  GetUserMeView,
  GetUserMeException,
} from '../../../../user/get-user-me/get-user-me.type';
export declare function getUserMe(connection: IConnection): Promise<getUserMe.Output>;
export declare namespace getUserMe {
  type Output = IPropagation<{
    200: GetUserMeView;
    400: GetUserMeException;
  }>;
  const METADATA: {
    readonly method: 'GET';
    readonly path: '/users/me';
    readonly request: null;
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: () => string;
}

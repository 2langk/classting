import type { IConnection, Primitive, IPropagation } from '@nestia/fetcher';
import type {
  SignInUserData,
  SignInUserView,
  SignInUserException,
} from '../../../../user/sign-in-user/sign-in-user.type';
export declare function signInUser(
  connection: IConnection,
  data: signInUser.Input,
): Promise<signInUser.Output>;
export declare namespace signInUser {
  type Input = Primitive<SignInUserData>;
  type Output = IPropagation<{
    201: SignInUserView;
    400: SignInUserException;
  }>;
  const METADATA: {
    readonly method: 'POST';
    readonly path: '/users/sign-in';
    readonly request: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: () => string;
}

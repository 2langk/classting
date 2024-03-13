import type { IConnection, Primitive, IPropagation } from '@nestia/fetcher';
import type {
  SignUpUserData,
  SignUpUserView,
  SignUpUserException,
} from '../../../../user/sign-up-user/sign-up-user.type';
export declare function signUpUser(
  connection: IConnection,
  data: signUpUser.Input,
): Promise<signUpUser.Output>;
export declare namespace signUpUser {
  type Input = Primitive<SignUpUserData>;
  type Output = IPropagation<{
    201: SignUpUserView;
    400: SignUpUserException;
  }>;
  const METADATA: {
    readonly method: 'POST';
    readonly path: '/users/sign-up';
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

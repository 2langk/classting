import { environment, UserRoleEnum } from '@libs/common';
import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

type JsonWebToken = {
  type: 'access';
  userId: number;
  userRole: UserRoleEnum;
};

@Injectable()
export class JwtManager {
  encode(params: JsonWebToken): string {
    switch (params.type) {
      case 'access':
        return sign(params, environment.jwt.access.secret, {
          expiresIn: environment.jwt.access.expire,
        });

      default:
        throw new Error(`not implemented jwt type. (encode)`);
    }
  }

  verify<T extends JsonWebToken['type'], U extends Extract<JsonWebToken, { type: T }>>(params: {
    type: T;
    token: string;
  }): U | null {
    try {
      const payload = (() => {
        switch (params.type) {
          case 'access':
            return verify(params.token, environment.jwt.access.secret);

          default:
            throw new Error(`not implemented jwt type. (verify)`);
        }
      })() as U;

      return payload;
    } catch (err) {
      return null;
    }
  }
}

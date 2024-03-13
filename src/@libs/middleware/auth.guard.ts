import { Request } from 'express';

import { AppException, F, UserRoleEnum } from '@libs/common';
import { ClsManager, JwtManager } from '@libs/infrastructure/manager';
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const AuthSymbol = Symbol('auth');

type AuthType = UserRoleEnum | 'public';

export const Auth = (...auths: AuthType[]) => SetMetadata(AuthSymbol, auths);

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtManager: JwtManager,
    private readonly clsManager: ClsManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auths = this.reflector.getAllAndOverride<AuthType[]>(AuthSymbol, [
      context.getHandler(),
      context.getClass(),
    ]);

    const authMap = F.assoicateBy((it) => it, auths);
    if (authMap['public']) {
      return true;
    }

    const accessToken = req?.headers?.authorization?.split('Bearer ')[1];
    if (!accessToken) {
      throw new AppException('invalid access token.');
    }

    const payload = this.jwtManager.verify({ type: 'access', token: accessToken });
    if (!payload) {
      throw new AppException('invalid access token.');
    }

    if (!authMap[payload.userRole]) {
      throw new AppException('not authorized.');
    }

    this.clsManager.setItem('currUser', {
      userId: payload.userId,
      userRole: payload.userRole,
    });

    return true;
  }
}

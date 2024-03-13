import { JwtManager } from '@libs/infrastructure/manager';
import { UserRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';
import { SignInUserData, SignInUserException, SignInUserView } from './sign-in-user.type';

@Injectable()
export class SignInUserPort {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtManager: JwtManager,
  ) {}

  @Transaction()
  async execute(data: SignInUserData): Promise<SignInUserView> {
    const { email, password } = data;

    const userAgg = await this.userRepository.findOneByEmail(email);
    if (!userAgg || userAgg.password !== password) {
      throw new SignInUserException('invalid email or password.');
    }

    return {
      accessToken: this.jwtManager.encode({
        type: 'access',
        userId: userAgg.id,
        userRole: userAgg.userRole.type,
      }),
    };
  }
}

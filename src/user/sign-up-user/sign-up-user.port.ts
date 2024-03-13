import { UserAggregate } from '@libs/domain';
import { UserRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';
import { SignUpUserData, SignUpUserException, SignUpUserView } from './sign-up-user.type';

@Injectable()
export class SignUpUserPort {
  constructor(private readonly userRepository: UserRepository) {}

  @Transaction()
  async execute(data: SignUpUserData): Promise<SignUpUserView> {
    const user = await this.userRepository.findOneByEmail(data.email);
    if (user) {
      throw new SignUpUserException('already email exist.');
    }

    const newUserAgg = UserAggregate.create({
      id: 0,
      email: data.email,
      password: data.password,
      name: data.name,
      userRole: { id: 0, type: data.userRole },
    });

    const newUserId = await this.userRepository.saveOne(newUserAgg);

    return { id: newUserId };
  }
}

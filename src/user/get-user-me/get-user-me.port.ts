import { ClsManager } from '@libs/infrastructure/manager';
import { UserRepository } from '@libs/infrastructure/repository';
import { Injectable } from '@nestjs/common';
import { GetUserMeException, GetUserMeView } from './get-user-me.type';

@Injectable()
export class GetUserMePort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<GetUserMeView> {
    const userAgg = await this.userRepository.findOneById(
      this.clsManager.getItem('currUser').userId,
    );
    if (!userAgg) {
      throw new GetUserMeException('user notfound.');
    }

    return userAgg;
  }
}

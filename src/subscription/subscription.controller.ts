import { Auth } from '@libs/middleware/auth.guard';
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

import {
  GetSubscriptionMeException,
  GetSubscriptionMePort,
  GetSubscriptionMeView,
} from './get-subscription-me';
import {
  UpsertOneSubscriptionData,
  UpsertOneSubscriptionPort,
  UpsertOneSubsriptionException,
  UpsertOneSubsriptionView,
} from './upsert-one-subscription';

@Controller('/subscriptions')
export class SubscriptionController {
  constructor(
    private readonly upsertOneSubscriptionPort: UpsertOneSubscriptionPort,
    private readonly getSubscriptionMePort: GetSubscriptionMePort,
  ) {}

  /**
   * 학교 구독(or 취소) 하기.
   * - 학생(student) 유저만 가능합니다.
   * - 기존값과 반대로 upsert 합니다.
   *
   * @tag Subscription
   *
   * @security bearer
   *
   * @param data 구독(취소)할 학교 id
   *
   * @return 구독 id
   */
  @Auth('student')
  @TypedException<UpsertOneSubsriptionException>(400)
  @TypedRoute.Post('/')
  async upsertOneSubscription(
    @TypedBody() data: UpsertOneSubscriptionData,
  ): Promise<UpsertOneSubsriptionView> {
    return this.upsertOneSubscriptionPort.execute(data);
  }

  /**
   * 자기 구독 정보 가져오기.
   *
   * @tag Subscription
   *
   * @security bearer
   *
   * @return 구독중인 학교 ids
   */
  @Auth('student')
  @TypedException<GetSubscriptionMeException>(400)
  @TypedRoute.Get('/me')
  async getSubscriptionMe(): Promise<GetSubscriptionMeView> {
    return this.getSubscriptionMePort.execute();
  }
}

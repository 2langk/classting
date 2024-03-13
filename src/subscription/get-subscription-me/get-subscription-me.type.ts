import { AppException } from '@libs/common';

export interface GetSubscriptionMeView {
  schoolIds: number[];
}

export class GetSubscriptionMeException extends AppException<'-.'> {}

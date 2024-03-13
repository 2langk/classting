import { AppException } from '@libs/common';
export interface GetSubscriptionMeView {
  schoolIds: number[];
}
export declare class GetSubscriptionMeException extends AppException<'-.'> {}

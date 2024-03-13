import type { IConnection, IPropagation } from '@nestia/fetcher';
import type {
  GetSubscriptionMeView,
  GetSubscriptionMeException,
} from '../../../../subscription/get-subscription-me/get-subscription-me.type';
export declare function getSubscriptionMe(
  connection: IConnection,
): Promise<getSubscriptionMe.Output>;
export declare namespace getSubscriptionMe {
  type Output = IPropagation<{
    200: GetSubscriptionMeView;
    400: GetSubscriptionMeException;
  }>;
  const METADATA: {
    readonly method: 'GET';
    readonly path: '/subscriptions/me';
    readonly request: null;
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: () => string;
}

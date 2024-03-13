import type { IConnection, Primitive, IPropagation } from '@nestia/fetcher';
import type {
  UpsertOneSubscriptionData,
  UpsertOneSubsriptionView,
  UpsertOneSubsriptionException,
} from '../../../subscription/upsert-one-subscription/upsert-one-subscription.type';
export * as me from './me';
export declare function upsertOneSubscription(
  connection: IConnection,
  data: upsertOneSubscription.Input,
): Promise<upsertOneSubscription.Output>;
export declare namespace upsertOneSubscription {
  type Input = Primitive<UpsertOneSubscriptionData>;
  type Output = IPropagation<{
    201: UpsertOneSubsriptionView;
    400: UpsertOneSubsriptionException;
  }>;
  const METADATA: {
    readonly method: 'POST';
    readonly path: '/subscriptions';
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

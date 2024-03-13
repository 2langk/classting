export type AggreagteEnum = 'news' | 'school' | 'subscription' | 'user';
export type DomainEventEnum =
  | 'news_created'
  | 'news_updated'
  | 'news_deleted'
  | 'school_created'
  | 'subscription_created'
  | 'subscription_canceled'
  | 'user_created';
export type SubscriptionStatusEnum = {
  admin?: 'manage';
  student?: 'subscribe' | 'cancel';
};
export type UserRoleEnum = 'operator' | 'admin' | 'student';

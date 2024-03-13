export type AggreagteEnum = 'news' | 'school' | 'subscribe' | 'user';
export type DomainEventEnum =
  | 'news_created'
  | 'news_updated'
  | 'news_deleted'
  | 'school_created'
  | 'subscribe_created'
  | 'subscribe_canceled'
  | 'user_created';
export type SubscribeStatusEnum = {
  admin?: 'manage';
  student?: 'subscribe' | 'cancel';
};
export type UserRoleEnum = 'operator' | 'admin' | 'student';

import { AppException } from '@libs/common';
export interface UpsertOneSubscriptionData {
  schoolId: number;
}
export interface UpsertOneSubsriptionView {
  id: number;
}
export declare class UpsertOneSubsriptionException extends AppException<'school notfound.'> {}

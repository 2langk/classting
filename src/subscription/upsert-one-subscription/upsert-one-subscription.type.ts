import { AppException } from '@libs/common';

export interface UpsertOneSubscriptionData {
  schoolId: number;
}

export interface UpsertOneSubsriptionView {
  id: number;
}

export class UpsertOneSubsriptionException extends AppException<'as.'> {}

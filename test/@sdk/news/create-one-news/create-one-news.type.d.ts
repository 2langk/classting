import { AppException } from '@libs/common';
export interface CreateOneNewsData {
  title: string;
  contents: string;
  schoolId: number;
}
export interface CreateOneNewsView {
  id: number;
}
export declare class CreateOneNewsException extends AppException<'permission denied.'> {}

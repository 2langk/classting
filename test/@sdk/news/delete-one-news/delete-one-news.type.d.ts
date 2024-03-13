import { AppException } from '@libs/common';
export interface DeleteOneNewsData {
  id: number;
}
export interface DeleteOneNewsView {
  id: number;
}
export declare class DeleteOneNewsException extends AppException<
  'news notfound.' | 'permission denied.'
> {}

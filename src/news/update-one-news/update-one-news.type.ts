import { AppException } from '@libs/common';

export interface UpdateOneNewsData {
  id: number;
  title: string | undefined;
  contents: string | undefined;
}

export interface UpdateOneNewsView {
  id: number;
}

export class UpdateOneNewsException extends AppException<'news notfound.' | 'permission denied.'> {}

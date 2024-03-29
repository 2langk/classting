import { AppException } from '@libs/common';
export interface FindManyNewsData {
  schoolIds: number[] | undefined;
  cursorId: number | undefined;
  pageSize: number;
  sort: 'recent';
}
export interface FindManyNewsView {
  news: {
    id: number;
    title: string;
    contents: string;
    schoolId: number;
    adminId: number;
  }[];
}
export declare class FindManNewsException extends AppException<'asd.'> {}

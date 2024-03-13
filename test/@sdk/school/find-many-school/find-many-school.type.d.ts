import { AppException } from '@libs/common';
export interface FindManySchoolData {
  cursorId: number | undefined;
  pageSize: number;
}
export interface FindManySchoolView {
  schools: {
    id: number;
    name: string;
    region: string;
  }[];
}
export declare class FindManySchoolException extends AppException<'asd.'> {}

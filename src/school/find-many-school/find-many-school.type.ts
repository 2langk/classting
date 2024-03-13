import { AppException } from '@libs/common';

export interface FindManySchoolData {
  // todo: filter ids
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

export class FindManySchoolException extends AppException<'asd.'> {}

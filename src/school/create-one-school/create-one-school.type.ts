import { AppException } from '@libs/common';

export interface CreateOneSchoolData {
  name: string;
  region: string;
}

export interface CreateOneSchoolView {
  id: number;
}

export class CreateOneSchoolException extends AppException<'asd.'> {}

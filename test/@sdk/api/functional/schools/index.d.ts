import type { IConnection, Primitive, IPropagation } from '@nestia/fetcher';
import type {
  CreateOneSchoolData,
  CreateOneSchoolView,
  CreateOneSchoolException,
} from '../../../school/create-one-school/create-one-school.type';
export declare function createOneSchool(
  connection: IConnection,
  data: createOneSchool.Input,
): Promise<createOneSchool.Output>;
export declare namespace createOneSchool {
  type Input = Primitive<CreateOneSchoolData>;
  type Output = IPropagation<{
    201: CreateOneSchoolView;
    400: CreateOneSchoolException;
  }>;
  const METADATA: {
    readonly method: 'POST';
    readonly path: '/schools';
    readonly request: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: () => string;
}

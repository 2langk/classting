import type { IConnection, Primitive, IPropagation, Resolved } from '@nestia/fetcher';
import type {
  CreateOneSchoolData,
  CreateOneSchoolView,
  CreateOneSchoolException,
} from '../../../school/create-one-school/create-one-school.type';
import type {
  FindManySchoolData,
  FindManySchoolView,
  FindManySchoolException,
} from '../../../school/find-many-school/find-many-school.type';
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
export declare function findManySchool(
  connection: IConnection,
  data: findManySchool.Query,
): Promise<findManySchool.Output>;
export declare namespace findManySchool {
  type Query = Resolved<FindManySchoolData>;
  type Output = IPropagation<{
    200: FindManySchoolView;
    400: FindManySchoolException;
  }>;
  const METADATA: {
    readonly method: 'GET';
    readonly path: '/schools';
    readonly request: null;
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: (data: findManySchool.Query) => string;
}

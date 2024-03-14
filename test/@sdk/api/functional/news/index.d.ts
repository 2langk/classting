import type { IConnection, Primitive, IPropagation, Resolved } from '@nestia/fetcher';
import type {
  CreateOneNewsData,
  CreateOneNewsView,
  CreateOneNewsException,
} from '../../../news/create-one-news/create-one-news.type';
import type {
  DeleteOneNewsView,
  DeleteOneNewsException,
} from '../../../news/delete-one-news/delete-one-news.type';
import type {
  FindManyNewsData,
  FindManyNewsView,
  FindManNewsException,
} from '../../../news/find-many-news/find-many-news.type';
import type {
  UpdateOneNewsData,
  UpdateOneNewsView,
  UpdateOneNewsException,
} from '../../../news/update-one-news/update-one-news.type';
export declare function createOneNews(
  connection: IConnection,
  data: createOneNews.Input,
): Promise<createOneNews.Output>;
export declare namespace createOneNews {
  type Input = Primitive<CreateOneNewsData>;
  type Output = IPropagation<{
    201: CreateOneNewsView;
    400: CreateOneNewsException;
  }>;
  const METADATA: {
    readonly method: 'POST';
    readonly path: '/news';
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
export declare function updateOneNews(
  connection: IConnection,
  id: number,
  data: updateOneNews.Input,
): Promise<updateOneNews.Output>;
export declare namespace updateOneNews {
  type Input = Primitive<Omit<UpdateOneNewsData, 'id'>>;
  type Output = IPropagation<{
    200: UpdateOneNewsView;
    400: UpdateOneNewsException;
  }>;
  const METADATA: {
    readonly method: 'PUT';
    readonly path: '/news/:id';
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
  const path: (id: number) => string;
}
export declare function deleteOneNews(
  connection: IConnection,
  id: number,
): Promise<deleteOneNews.Output>;
export declare namespace deleteOneNews {
  type Output = IPropagation<{
    200: DeleteOneNewsView;
    400: DeleteOneNewsException;
  }>;
  const METADATA: {
    readonly method: 'DELETE';
    readonly path: '/news/:id';
    readonly request: null;
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: (id: number) => string;
}
export declare function findManyNews(
  connection: IConnection,
  data: findManyNews.Query,
): Promise<findManyNews.Output>;
export declare namespace findManyNews {
  type Query = Resolved<FindManyNewsData>;
  type Output = IPropagation<{
    200: FindManyNewsView;
    400: FindManNewsException;
  }>;
  const METADATA: {
    readonly method: 'GET';
    readonly path: '/news';
    readonly request: null;
    readonly response: {
      readonly type: 'application/json';
      readonly encrypted: false;
    };
    readonly status: null;
  };
  const path: (data: findManyNews.Query) => string;
}

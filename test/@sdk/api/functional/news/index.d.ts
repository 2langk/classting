import type { IConnection, Primitive, IPropagation } from '@nestia/fetcher';
import type {
  CreateOneNewsData,
  CreateOneNewsView,
  CreateOneNewsException,
} from '../../../news/create-one-news/create-one-news.type';
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

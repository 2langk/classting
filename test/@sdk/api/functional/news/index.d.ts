import type { IConnection, Primitive, IPropagation } from '@nestia/fetcher';
import type {
  CreateOneNewsData,
  CreateOneNewsView,
  CreateOneNewsException,
} from '../../../news/create-one-news/create-one-news.type';
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

export declare class AppException<T extends string> extends Error {
  readonly name: string;
  readonly message:
    | T
    | 'invalid access token.'
    | 'not authorized.'
    | 'invalid request data.'
    | 'internal server error.';
  readonly statusCode: number;
  readonly stack: string;
  readonly additional: Record<string, any> | undefined;
  constructor(message: T, statusCode?: number, additional?: Record<string, any>);
}

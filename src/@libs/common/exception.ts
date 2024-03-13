export class AppException<T extends string> extends Error {
  public override readonly name: string;
  public override readonly message!:
    | T
    | 'invalid access token.'
    | 'not authorized.'
    | 'invalid request data.'
    | 'internal server error.';
  public readonly statusCode!: number;
  /** @hidden */
  public override readonly stack!: string;
  /** @hidden */
  public readonly additional!: Record<string, any> | undefined;

  constructor(message: T, statusCode = 400, additional?: Record<string, any>) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.additional = additional || undefined;
    Error.captureStackTrace(this, this.constructor);
  }
}

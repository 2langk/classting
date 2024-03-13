'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppException = void 0;
class AppException extends Error {
  constructor(message, statusCode = 400, additional) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.additional = additional || undefined;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.AppException = AppException;
//# sourceMappingURL=exception.js.map

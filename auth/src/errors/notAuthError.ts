import { CustomError } from './customError';

export class NotAuthError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');
    Object.setPrototypeOf(this, NotAuthError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}

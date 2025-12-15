class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;

export interface InavlidateTypes {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
}

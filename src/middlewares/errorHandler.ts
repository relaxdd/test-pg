import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES, STATUS_CODES } from "../defines";

function errorHandler(
  err: { statusCode?: number; message?: string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR } = err;
  let { message } = err;

  if (statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR) {
    console.error(err)
    message = ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  res.status(statusCode).send({ message });
}

export default errorHandler;

class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class Response {
  constructor(status, message, data, refrence, error) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.refrence = refrence;
    this.error = error;
  }
}

export { ResponseError, Response };

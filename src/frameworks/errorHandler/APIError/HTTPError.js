class HTTPError {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new HTTPError(400, msg);
    }
  
    static notFound(msg) {
      return new HTTPError(404, msg);
    }
  
    static internal(msg) {
      return new HTTPError(500, msg);
    }
  }
  
  module.exports = HTTPError;
const HTTPError = require('./HTTPError');

function APIErrorHandler(err, req, res, next) {


  if (err instanceof HTTPError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json('something went wrong');
}

module.exports = APIErrorHandler;
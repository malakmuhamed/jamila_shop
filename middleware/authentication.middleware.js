const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  signAccessToken: (userid) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.TOKEN_SECRET;
      const options = {
        expiresIn: '1h',
        issuer: 'misrexchange.com',
        audience: userid,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authhrader = req.headers['authorization'];
    const bearerToken = authhrader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        // if (err.name === "JsonWebTokenError") {
        //     return next(createError.Unauthorized())
        // }else{
        //     return next(createError.Unauthorized(err.message))
        // }
        const mas =
          err.name === 'JsonWebTokenError' ? 'unauthorized' : err.message;
        return next(createError.Unauthorized(mas));
      }
      req.payload = payload;
      next();
    });
  },
};

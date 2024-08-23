const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) {
    return res.json({ error: 'User Not Logged In' });
  } else {
    try {
      const validToken = verify(accessToken, 'randomsecreto1i2349f8n9nqe98rncnane8v98ae898nvounqoiu3bro8cb');

      if (validToken) {
        req.user = validToken;
        return next();
      }
    } catch(error) {
      return res.json({ error: `${error}` });
    }
  }
}

module.exports = { validateToken };

//JsonWebToken : Access token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //Get token
    const token = req.headers.authorization.split(' ')[1];
    //Decode token with secret key
    const decodedToken = jwt.verify(token, process.env.MY_TOKEN);
    //Get userId of token
    const userId = decodedToken.userId;
    //Add userId in request
    req.auth = { userId };
    //Test if userId of request is the same of the userId of token 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
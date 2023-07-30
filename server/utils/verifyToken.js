import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You're not authorized",
    });
  }
  //if token exists then verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    req.user = user;
    next(); //don't forget to call next
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.email === req.params.email) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authenticated",
      });
    }
  });
};


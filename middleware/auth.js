const jwt = require("jsonwebtoken");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses")
const User = require("../models/user")

exports.protect = async (req, res, next) => {
  let token;

  if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return errorResponse(res, 401, 'Access Denied. Not authorized to access this route', null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return errorResponse(res, 401, 'Access Denied. Not authorized to access this route', null);
    }

    req.user = user;

    next();
  } catch (err) {
    
    return next (errorResponse(res, 401, 'Access Denied. Not authorized to access this router', null));
  }
};
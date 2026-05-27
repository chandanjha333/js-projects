import { getUser } from "../service/auth.js";

export function checkForAuthentication(req, res, next) {
  const tokencookie = req.cookies?.token;
  req.user = null;

  if(!tokencookie) return next();

  const token = tokencookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

export function restrictTo(roles) {
  return function(req, res, next) {
    if(!req.user) res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("UnAuthorised");

    return next();
  }
}

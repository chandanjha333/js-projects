import jwt from "jsonwebtoken";
const secret = "ChandanChandan";

export function setUser(user) {
  return jwt.sign(
    {
    id: user._id,
    email: user.email,
    },
    secret
  );
}

export function getUser(token) {
  if(!token) return null;
  return jwt.verify(token, secret);
}
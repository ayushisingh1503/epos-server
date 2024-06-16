import { verifyToken } from "../utilities/token.js";

export const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const newToken = token?.split(" ")?.[1];

    const user = verifyToken(newToken);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json({ message: "token expired" });
    return;
  }
};

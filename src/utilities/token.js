import jwt from "jsonwebtoken";

export const createToken = (payload, expiresIn) => {
  const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
  const signed = jwt.sign(payload, secretKey, { expiresIn });
  return signed;
};

export const verifyToken = (token) => {
  const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
  const verified = jwt.verify(token, secretKey);
  return verified;
};

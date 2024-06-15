import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const signed = jwt.sign(payload, secretKey, {
    expiresIn: 5 * 60,
  });
  return signed;
};

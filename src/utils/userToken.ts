import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";

/**
 * Creates a JWT token for a given user
 *
 * @param {Partial<IUser>} user - The user to create a token for
 * @returns {Promise<{accessToken: string}>} A promise that resolves with an object containing the JWT token
 */
export const createToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
  };

  const accessToken = generateToken(jwtPayload, process.env.JWT_SECRET!, process.env.ACCESS_EXPERTED!);

  return { accessToken };
};

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);

  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};
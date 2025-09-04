"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Creates a JWT token for a given user
 *
 * @param {Partial<IUser>} user - The user to create a token for
 * @returns {Promise<{accessToken: string}>} A promise that resolves with an object containing the JWT token
 */
const createToken = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
    };
    const accessToken = (0, exports.generateToken)(jwtPayload, process.env.JWT_SECRET, process.env.ACCESS_EXPERTED);
    return { accessToken };
};
exports.createToken = createToken;
const generateToken = (payload, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn,
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token, secret) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;

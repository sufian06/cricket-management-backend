"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = payload;
    if (!username && !email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'username or email is required');
    }
    // check user is exist
    const user = yield user_model_1.User.findOne({
        $or: [{ username }, { email }],
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // check valid password
    const userPassword = user.password;
    let validPassword = false;
    if (password) {
        const comparedPass = yield bcrypt_1.default.compare(password, userPassword);
        validPassword = comparedPass;
    }
    if (!validPassword) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User password is not correct');
    }
    // create access token
    const { _id, username: userName } = user;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ _id, userName }, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY);
    // create refresh token
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ _id, userName }, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthService = {
    loginUser,
};

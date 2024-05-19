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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const createAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = user;
    const existedUsername = yield user_model_1.User.findOne({
        username,
    });
    if (existedUsername) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'username is already exist, use another username!');
    }
    const existedEmail = yield user_model_1.User.findOne({
        email,
    });
    if (existedEmail) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This email is already exist, use another email!');
    }
    // set role
    user.role = 'admin';
    const createdUser = yield user_model_1.User.create(user);
    const result = yield user_model_1.User.findById(createdUser._id).select('-password');
    return result;
});
exports.UserService = {
    createAdmin,
};

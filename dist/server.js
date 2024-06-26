"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});
dotenv_1.default.config({
    path: './.env',
});
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(process.env.PORT || 5000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
})
    .catch(err => {
    console.log('MONGO db connection failed !! ', err);
});

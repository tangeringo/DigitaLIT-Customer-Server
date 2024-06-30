"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    authPlugins: {
        mysql_clear_password: () => () => { var _a; return Buffer.from((_a = process.env.DB_PASSWORD) !== null && _a !== void 0 ? _a : ""); }
    }
};
const pool = mysql2_1.default.createPool(dbConfig);
exports.default = pool;

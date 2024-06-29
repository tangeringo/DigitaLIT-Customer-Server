"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.db = promise_1.default.createConnection({
    // host: 'diglit.online',
    host: '37.46.209.133',
    user: 'admin@diglit',
    password: 'EU@nD;EmMgW4"9$fqS9Ij;m!A',
    database: 'diglit_customers'
});
exports.default = exports.db;

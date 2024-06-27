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
exports.insertUser = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_utils_1 = require("./utils/crypto.utils");
const connection = promise_1.default.createPool({
    host: 'diglit.online',
    user: 'admin@diglit',
    password: 'EU@nD;EmMgW4"9$fqS9Ij;m!A',
    database: 'diglit_customers'
});
function insertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { createdAt, displayName, email, password } = user;
            const query = 'INSERT INTO auth (createdAt, displayName, email, hash) VALUES (?, ?, ?, ?)';
            const encryptedEmail = (0, crypto_utils_1.encrypt)(email);
            const encryptedDisplayName = (0, crypto_utils_1.encrypt)(displayName);
            const hash = yield bcrypt_1.default.hash(password, 10); // 10 is the salt rounds
            yield connection.execute(query, [createdAt, encryptedDisplayName, encryptedEmail, hash]);
            console.log("successfully added data");
        }
        catch (error) {
            console.log("failed to add the data: ", error);
        }
    });
}
exports.insertUser = insertUser;
exports.default = connection;

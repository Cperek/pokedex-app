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
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const table = "users";
const saltRounds = 10;
class User {
    constructor() {
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            if (typeof this.password === 'string') {
                const hashedPassword = yield bcrypt_1.default.hash(this.password, saltRounds);
                yield (0, database_1.insert_record)(table, {
                    username: this.username,
                    password: hashedPassword,
                    deleted: this.deleted ? this.deleted : 0,
                    created_at: this.created_at ? this.created_at : (0, database_1.now)()
                });
            }
            else {
                throw new Error("Password has to be string!");
            }
        });
        this.unhash = (Text, Hash) => __awaiter(this, void 0, void 0, function* () {
            let result = false;
            yield bcrypt_1.default.compare(Text, Hash).then(function (response) {
                result = response;
            });
            return result;
        });
    }
}
exports.default = User;

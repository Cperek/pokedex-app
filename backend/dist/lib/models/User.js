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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const table = "users";
class User {
    constructor() {
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.insert_record)(table, {
                username: this.username,
                password: this.password,
                deleted: this.deleted ? this.deleted : 0,
                created_at: this.created_at ? this.created_at : (0, database_1.now)()
            });
        });
    }
}
exports.default = User;
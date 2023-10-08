"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../lib/database"));
class Users {
    constructor(id, username, password, deleted, created_at, updated_at, deleted_at) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.deleted = deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.db = database_1.default.methods;
        this.table = "users";
        this.create = () => {
            if (this.username && this.password) {
                this.db.insert_record(this.table, {
                    username: this.username,
                    password: this.password,
                    deleted: this.deleted ? this.deleted : 0,
                    created_at: this.created_at ? this.created_at : this.now()
                });
                return true;
            }
            return false;
        };
        // other methods
        this.now = () => {
            return Math.floor(new Date().getTime() / 1000);
        };
    }
}
exports.default = Users;

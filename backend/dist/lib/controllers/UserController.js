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
const User_1 = __importDefault(require("../models/User"));
const database_1 = require("../database");
class UserController {
    constructor() {
        this.user = new User_1.default();
    }
    validate_and_register_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            // Validate user data
            if (!userData.username || !userData.password || !userData.repassword) {
                res.status(403).send({
                    error: "All input fields are requiered!"
                });
                return;
            }
            if (userData.password !== userData.repassword) {
                res.status(403).send({
                    error: "Passwords don't match"
                });
                return;
            }
            const userExist = yield (0, database_1.get_record)('users', //table
            { username: userData.username, deleted: 0 }, //where
            { _id: 0, username: 1 }) //select
                .then();
            {
                if (userExist !== null) {
                    res.status(403).send({
                        error: "Account already exists!"
                    });
                    return;
                }
                //Setting data for User.ts
                this.user.username = userData.username;
                this.user.password = userData.password;
                try {
                    yield this.user.create().then();
                    {
                        res.send(JSON.stringify(this.user));
                    }
                }
                catch (err) {
                    res.status(500).send({
                        error: "Database connection failed!"
                    });
                }
            }
        });
    }
}
exports.default = UserController;

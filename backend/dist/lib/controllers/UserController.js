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
const joi_1 = __importDefault(require("joi"));
class UserController {
    constructor() {
        this.user = new User_1.default();
    }
    log_in(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            // Validate user data
            if (!userData.username || !userData.password) {
                res.status(403).send({
                    error: "All input fields are requiered!"
                });
                return;
            }
            var User = yield (0, database_1.get_record)('users', //table
            { username: userData.username, deleted: 0 }, //where
            { _id: 1, username: 1, password: 1 }) //select
                .then();
            {
                if (User == null) {
                    res.status(403).send({
                        error: "The account does not exist!"
                    });
                    return;
                }
                else {
                    yield this.user.unhash(userData.password, User.password).then((result) => {
                        if (result) {
                            User.password = this.user.password;
                            res.send(JSON.stringify(User));
                        }
                        else {
                            res.status(403).send({
                                error: "The password doesn't match"
                            });
                        }
                    });
                }
            }
        });
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
            const schema = joi_1.default.object({
                username: joi_1.default.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .messages({
                    'string.base': `The username should be a type of text`,
                    'string.empty': `The username cannot be an empty field`,
                    'string.min': `The username should have a minimum length of {#limit}`,
                    'any.required': `The username is a required field`,
                    'string.alphanum': `The must only contain alpha-numeric characters`,
                }),
                password: joi_1.default.string()
                    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
                    .min(8)
                    .max(30)
                    .required()
                    .messages({
                    'string.base': `The password should be a type of text`,
                    'string.empty': `The password cannot be an empty field`,
                    'string.min': `The password should have a minimum length of {#limit}`,
                    'any.required': `The password is a required field`,
                    'string.pattern.base': `A password have to contain at least eight characters,
                    including at least one number and both lower and uppercase letters and one special characters`
                })
            });
            try {
                const validation = yield schema.validateAsync({ username: userData.username, password: userData.password });
            }
            catch (err) {
                let message = 'Unknown Error';
                if (joi_1.default.isError(err)) {
                    console.log(err);
                    message = err.message;
                }
                res.status(403).send({
                    error: message
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

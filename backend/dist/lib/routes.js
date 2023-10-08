"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
module.exports = (app) => {
    app.post('/register', (req, res) => {
        const result = new User_1.default(undefined, `${req.body.username}`, `${req.body.password}`, `${req.body.repassword}`).create();
        res.send({
            result: result
        });
    });
    app.post('/login', (req, res) => {
        res.send({
            username: `${req.body.username}`,
            password: `${req.body.password}`,
        });
    });
};

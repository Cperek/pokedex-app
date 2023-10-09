"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("./controllers/UserController"));
module.exports = (app) => {
    app.post('/register', (req, res) => {
        const controller = new UserController_1.default();
        const result = controller.validate_and_register_user(req.body);
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

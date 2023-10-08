"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
var db = database_1.default.methods;
module.exports = (app) => {
    app.post('/register', (req, res) => {
        // username: `${req.body.username}`,
        // password: `${req.body.password}`,
        // repassword: `${req.body.repassword}`,
        const result = db.insert_record('users', {
            username: req.body.username,
            password: req.body.password,
            created_at: now()
        });
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
// other methods
function now() {
    return Math.floor(new Date().getTime() / 1000);
}

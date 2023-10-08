"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mc = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongodb_1 = require("mongodb");
//get configuration properties
require('dotenv').config();
const config = process.env;
const uri = config.MONGO_DB_URI ? config.MONGO_DB_URI : '';
const port = config.PORT;
//get MongoCilent and export it for database.ts usage
const mc = new mongodb_1.MongoClient(uri);
exports.mc = mc;
//declare express app
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//request handler
require('./lib/routes')(app);
//listener
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

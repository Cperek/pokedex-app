"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
fs_1.default
    .readdirSync(__dirname)
    .filter((file) => file !== 'index.ts'
    &&
        file !== 'index.js')
    .forEach((file) => {
});

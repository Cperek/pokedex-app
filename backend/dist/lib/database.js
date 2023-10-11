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
exports.now = exports.get_record = exports.insert_record = void 0;
const __1 = require("..");
const mongodb_1 = require("mongodb");
function Connect() {
    const mc = new mongodb_1.MongoClient(__1.uri);
    return mc;
}
function insert_record(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let mc = Connect();
        try {
            const db = mc.db(__1.database);
            const collection = db.collection(table);
            const result = yield collection.insertOne(data);
        }
        finally {
            yield mc.close();
        }
    });
}
exports.insert_record = insert_record;
function get_record(table, where, select) {
    return __awaiter(this, void 0, void 0, function* () {
        let mc = Connect();
        var result = null;
        try {
            const db = mc.db(__1.database);
            const collection = db.collection(table);
            result = yield collection.findOne(where, {
                projection: select,
            });
        }
        finally {
            yield mc.close().then();
            {
                return result;
            }
        }
    });
}
exports.get_record = get_record;
function now() {
    return Math.floor(new Date().getTime() / 1000);
}
exports.now = now;

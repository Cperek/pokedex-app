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
const index_1 = require("./index");
exports.default = ({
    methods: {
        insert_record,
    }
});
//db functions
function insert_record(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = index_1.mc.db();
            const collection = db.collection(table);
            const result = yield collection.insertOne(data);
            return result;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield index_1.mc.close();
        }
    });
}

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
const __1 = require("..");
exports.default = ({
    methods: {
        insert_record,
    }
});
//db functions
function insert_record(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var status;
        try {
            const db = __1.mc.db();
            const collection = db.collection(table);
            yield collection.insertOne(data);
            status = "Record added to the database";
        }
        catch (error) {
            status = error;
        }
        finally {
            yield __1.mc.close();
        }
        return status;
    });
}

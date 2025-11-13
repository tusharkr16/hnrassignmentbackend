"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB = "mongodb+srv://tusharkumar9871:XUT934rimcNC2WOq@cluster0.hmpr2hk.mongodb.net/mernt?retryWrites=true&w=majority";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(DB);
        console.log("Connection successful with DB");
    }
    catch (err) {
        console.error("Error in connection with DB", err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTable = void 0;
const cli_table_1 = __importDefault(require("cli-table"));
exports.uploadTable = new cli_table_1.default({
    head: ["源文件", "目标文件", "结果"],
});

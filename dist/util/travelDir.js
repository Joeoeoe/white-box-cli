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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelDir = void 0;
const basic_1 = require("./basic");
const path_1 = __importDefault(require("path"));
const Result_1 = require("./Result");
exports.travelDir = function (dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const filesList = [];
        const travel = function (dir, filesList) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield basic_1.readDir(dir);
                if (res.err) {
                    throw res.err;
                }
                const files = res.data;
                for (const item of files) {
                    const itemPath = path_1.default.join(dir, item);
                    const { data: isDir, err } = yield basic_1.isDirFun(itemPath);
                    if (err) {
                        throw err;
                    }
                    if (isDir) {
                        const recurseRes = yield travel(itemPath, filesList);
                        if (recurseRes.err) {
                            throw recurseRes.err;
                        }
                    }
                    else {
                        filesList.push(itemPath);
                    }
                }
                return new Result_1.Result(filesList, null);
            });
        };
        const res = yield travel(dir, filesList);
        return res;
    });
};

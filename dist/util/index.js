"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCmd = exports.mkDir = exports.readDir = exports.writeFile = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const Result_1 = __importDefault(require("./Result"));
exports.readFile = function (path) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path, (err, data) => {
            resolve(new Result_1.default(data, err));
        });
    });
};
exports.writeFile = function (path, data) {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(path, data, function (err) {
            resolve(new Result_1.default(true, err));
        });
    });
};
exports.readDir = function (path) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(path, function (err, files) {
            resolve(new Result_1.default(files, err));
        });
    });
};
exports.mkDir = function (path) {
    return new Promise((resolve, reject) => {
        fs_1.default.mkdir(path, function (err) {
            resolve(new Result_1.default(true, err));
        });
    });
};
exports.parseCmd = function (cmd) {
    const optionsArray = cmd.options;
    const optionsObj = {};
    const args = cmd.args;
    for (let i = 0; i < optionsArray.length; i++) {
        const optionItem = optionsArray[i];
        const longFlag = optionItem.long.replace(/^--/, '');
        optionsObj[longFlag] = args[i];
    }
    return optionsObj;
};

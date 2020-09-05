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
exports.build = void 0;
const webpack_1 = __importDefault(require("webpack"));
const util_1 = require("../../util");
const webpackPromise = function (config) {
    return new Promise((resolve, reject) => {
        webpack_1.default(config, (err, stats) => {
            if (err || stats.hasErrors()) {
                reject(err);
            }
            resolve(true);
        });
    });
};
function build(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const tip = new util_1.TipObj();
        const config = require(path);
        let buildRes = null;
        try {
            tip.loading('打包中');
            buildRes = yield webpackPromise(config);
        }
        catch (error) {
            tip.fail(error.message);
            return false;
        }
        if (buildRes === true) {
            tip.success('打包成功!');
        }
        return true;
    });
}
exports.build = build;

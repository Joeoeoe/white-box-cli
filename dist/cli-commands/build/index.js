"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const webpack_1 = __importDefault(require("webpack"));
const util_1 = require("../../util");
function build(path) {
    const tip = new util_1.TipObj();
    tip.loading('打包中');
    const config = require(path);
    webpack_1.default(config, (err, stats) => {
        if (err || stats.hasErrors()) {
            tip.fail(err.message);
        }
        tip.success('打包成功!');
    });
}
exports.build = build;

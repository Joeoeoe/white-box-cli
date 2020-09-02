"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const webpack_1 = __importDefault(require("webpack"));
function build(path) {
    const config = require(path);
    webpack_1.default(config, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log("bug");
        }
        console.log("build finish");
    });
}
exports.build = build;

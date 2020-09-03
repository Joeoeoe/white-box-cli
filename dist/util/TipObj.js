"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipObj = void 0;
const ora_1 = __importDefault(require("ora"));
class TipObj {
    constructor() {
        this.spinner = ora_1.default();
    }
    loading(text) {
        const spinner = this.spinner;
        spinner.start(text);
    }
    success(text) {
        const spinner = this.spinner;
        spinner.succeed(text);
    }
    fail(text) {
        const spinner = this.spinner;
        spinner.fail(text);
    }
    warn(text) {
        const spinner = this.spinner;
        spinner.warn(text);
    }
    stop() {
        const spinner = this.spinner;
        spinner.stop();
    }
}
exports.TipObj = TipObj;

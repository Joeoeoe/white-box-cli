"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(data, err) {
        this.err = err ? err : null;
        this.data = data ? data : null;
    }
}
exports.Result = Result;

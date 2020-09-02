"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(data, err) {
        this.err = err ? err : null;
        this.data = data ? data : null;
    }
}
exports.default = Result;

module.exports = class Result {
    constructor(data, err) {
        this.err = err ? err : null;
        this.data = data ? data : null;
    }
}
export default class Result {
    err: Error; // 错误
    data: any; // 结果或数据
    constructor(data, err) {
        this.err = err ? err : null;
        this.data = data ? data : null;
    }
}
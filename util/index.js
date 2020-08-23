const fs = require('fs');
const Result = require('./Result');

const readFile = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            resolve(new Result(data, err))
        })
    });
};

const writeFile = function (path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, function (err) {
            resolve(new Result(data, err))
        })
    })
};

const readDir = function (path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, function (err, files) {
            resolve(new Result(files, err))
        })
    })
};

const mkDir = function (path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, function (err) {
            resolve(new Result(true, err));
        })
    })
};


module.exports = {
    readFile,
    writeFile,
    readDir,
    mkDir,
}
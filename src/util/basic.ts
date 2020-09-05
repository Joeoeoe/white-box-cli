import fs from "fs";
import { Result } from "./Result";

export const readFile = function (path: string) {
  return new Promise<Result>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      resolve(new Result(data, err));
    });
  });
};

export const isDirFun = function (path: string) {
  return new Promise<Result>((resolve, reject) => {
    fs.stat(path, function (err, stats) {
      const isDir = stats.isDirectory();
      resolve(new Result(isDir, err));
    });
  });
};

export const writeFile = function (path: string, data) {
  return new Promise<Result>((resolve, reject) => {
    fs.writeFile(path, data, function (err) {
      resolve(new Result(true, err));
    });
  });
};

export const readDir = function (path: string) {
  return new Promise<Result>((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      resolve(new Result(files, err));
    });
  });
};

export const mkDir = function (path: string) {
  return new Promise<Result>((resolve, reject) => {
    fs.mkdir(path, function (err) {
      resolve(new Result(true, err));
    });
  });
};

export const parseCmd = function (cmd) {
  const optionsArray = cmd.options;
  const optionsObj = {};

  for (let i = 0; i < optionsArray.length; i++) {
    const optionItem = optionsArray[i];
    const longFlag = optionItem.long.replace(/^--/, "");
    if(cmd[longFlag]){
      optionsObj[longFlag] = cmd[longFlag]
    }
  }
  return optionsObj;
};

// 清除值为undefined的key
export const cleanOption = function (option) {
  const cleanedOption = {};
  Object.keys(option).forEach(function (key) {
    if (option[key] !== undefined) {
      cleanedOption[key] = option[key];
    }
  });
  return cleanedOption;
};
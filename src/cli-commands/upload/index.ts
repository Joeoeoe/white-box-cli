import Client from "ssh2-sftp-client";
import { TipObj } from "../../util";
import chalk from "chalk";
import { IUploadConfig } from "../../types";

const log = console.log;

const validateUpload = function (config: IUploadConfig): boolean {
  const keySets = new Set([
    "sourcePath",
    "targetPath",
    "targetServer",
    "targetServer.host",
    "targetServer.port",
    "targetServer.username",
    "targetServer.password",
  ]);

  for (const outKey of keySets) {
    let tempObj = config;
    const keyArray = outKey.split(".");
    for (const key of keyArray) {
      if (tempObj.hasOwnProperty(key)) {
        tempObj = tempObj[key];
      } else {
        return false;
      }
    }
  }
  return true;
};

export async function upload(uploadConfigPath: string) {
  const tip = new TipObj();
  const sftp = new Client();

  let uploadConfig = null;
  try {
    uploadConfig = require(uploadConfigPath);
  } catch (error) {
    tip.fail(error.message);
    return;
  }

  try {
    // uploadJson格式校验
    const formatRight = validateUpload(uploadConfig);
    if (formatRight === false) {
      throw new Error(`upload.json格式错误`);
    }
  } catch (error) {
    tip.fail(error.message);
    const rightConfig = {
      sourcePath: "源文件路径，如: ./dist",
      targetPath: "服务器目标路径，如: /var/XXX/",
      targetServer: {
        host: "目标服务器IP地址",
        poAAAArt: "端口号，sftp默认为22",
        username: "用户名",
        password: "密码",
      },
    };
    // TODO 待添加提示
  }

  const sourcePath = uploadConfig.sourcePath;
  const targetPath = uploadConfig.targetPath;

  try {
    tip.loading("正在连接服务器...");
    await sftp.connect(uploadConfig.targetServer);
    tip.success("成功连接至服务器");
  } catch (error) {
    tip.fail("连接服务器失败，原因: ");
    log(error.message);
    return;
  }

  try {
    tip.success("开始上传...");
    sftp.on("upload", (info) => {
      console.log(`  上传成功: ${chalk.blueBright.bold(info.source)}`);
    });

    await sftp.uploadDir(sourcePath, targetPath);

    tip.success(`${sourcePath} 内容成功上传至 ${targetPath}`);
    sftp.end();
  } catch (error) {
    tip.fail("上传出现错误，原因: ");
    log(error.message);
    return;
  }
}

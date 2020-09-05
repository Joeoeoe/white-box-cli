import Client from "ssh2-sftp-client";
import chalk from "chalk";
import inquirer from 'inquirer';
import { TipObj } from "../../util";
import { IUploadConfig } from "../../types";
import { RIGHT_CONFIG } from "./constants";


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

  /**
   * 泄露确认
   */
  const confirmRes = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'uploadConfirm',
      message: chalk.redBright('请确认upload.json不会外泄，比如.gitignore文件应该含upload.json路径!'),
      default: false,
    }
  ]);
  if (confirmRes.uploadConfirm === false) {
    return;
  }

  let uploadConfigArray: Array<IUploadConfig> = null;
  let uploadConfig: IUploadConfig = null;
  try {
    // 正确引入upload.js
    uploadConfigArray = require(uploadConfigPath)['serverArray'];
  } catch (error) {
    tip.fail(error.message);
    return;
  }

  /**
   * 环境选择
   */
  const envRes = await inquirer.prompt([
    {
      type: "list",
      name: "envName",
      message: chalk.blueBright('请选择环境：'),
      choices: uploadConfigArray.map(item => item.name),
    },
  ]);

  uploadConfig = uploadConfigArray.find(item => item.name === envRes['envName']);



  try {
    // uploadJson格式校验
    const formatRight = validateUpload(uploadConfig);
    if (formatRight === false) {
      throw new Error(`服务器信息配置有误`);
    }
  } catch (error) {
    tip.fail(error.message);
    log(chalk.greenBright('upload.json格式示例: '));
    // TODO 到时贴github链接
    log(JSON.stringify(RIGHT_CONFIG, null, 2));
    return;
  }



  const sourcePath = uploadConfig.sourcePath;
  const targetPath = uploadConfig.targetPath;

  try {
    // 连接服务器是否有误
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
      console.log(`  上传成功: ${chalk.blueBright(info.source)}`);
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

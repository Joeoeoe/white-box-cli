import Client from "ssh2-sftp-client";
import { IUploadConfig } from "../../types";
import { TipObj } from "../../util";
import chalk from "chalk";

const log = console.log;

export async function upload(sourcePath: string, uploadConfig: IUploadConfig) {
  const tip = new TipObj();
  const targetPath = uploadConfig.targetPath;
  const sftp = new Client();

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

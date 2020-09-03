
import fs from 'fs';
import path from 'path';
import Client from "ssh2-sftp-client";
import { IUploadConfig } from "../../types";
import { travelDir, TipObj } from "../../util";

export async function upload(sourcePath: string, uploadConfig: IUploadConfig) {
  const tip = new TipObj();
  const targetPath = uploadConfig.targetPath;
  const sftp = new Client();
  
  await sftp.connect(uploadConfig.targetServer);
  sftp.on('upload', info => {
    console.log(`uploaded: ${info.source}`);
  });

  const uploadRes = await sftp.uploadDir(sourcePath, targetPath);

  console.log('上传成功')

  // try {

  //   const filesRes = await travelDir(sourcePath);
  //   if (filesRes.err) {
  //     throw filesRes.err;
  //   }

  //   const filesList = filesRes.data;

  //   await sftp.connect(uploadConfig.targetServer);
  //   console.log(filesList);
  //   for (const file of filesList) {
  //     const data = fs.createReadStream(file);
  //     const serverFilePath = path.join(targetPath, file);
  //     await sftp.put(data, serverFilePath.replace(/\\/g, '/'));// 解决linux与window下正反斜杆问题
  //     console.log(`${file}上传成功`);
  //   }
  // } catch (error) {
  //   tip.fail(error.message);
  // }
}

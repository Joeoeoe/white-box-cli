
import fs from 'fs';
import path from 'path';
import Client from "ssh2-sftp-client";
import { IUploadConfig } from "../../types";
import { travelDir, TipObj } from "../../util";

export async function upload(sourcePath: string, uploadConfig: IUploadConfig) {
  const tip = new TipObj();
  const targetPath = uploadConfig.targetPath;
  const sftp = new Client();
  try {

    const filesRes = await travelDir(sourcePath);
    if (filesRes.err) {
      throw filesRes.err;
    }

    const filesList = filesRes.data;

    await sftp.connect(uploadConfig.targetServer);
    console.log(filesList);

    const listRes = await sftp.list(targetPath);

    console.log(listRes)


    for (const file of filesList) {
        const data = fs.createReadStream(file);
        const temp = path.join(targetPath, file);
        console.log(temp);
        await sftp.put(data, temp);
        console.log(`${file}上传成功`);
    }
  } catch (error) {
      tip.fail(error.message);
  }
}

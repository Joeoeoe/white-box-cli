export interface IUploadConfig {
  name: string;//环境名称
  sourcePath: string; //源文件路径，如: ./dist
  targetPath: string; //服务器目标路径，如: /var/XXX/
  targetServer: {
    host: string; //目标服务器IP地址
    port: number;  //端口号，sftp默认为22
    username: string;  //用户名
    password: string;  //密码
  };
}

export interface IConfigFile {
  serverArray: Array<IUploadConfig>
}
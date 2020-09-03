export interface IUploadConfig {
  sourcePath: string; // 资源路径
  targetPath: string; // 目标路径
  targetServer: {
    // 目标主机信息
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

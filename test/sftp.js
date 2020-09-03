let Client = require("ssh2-sftp-client");
let sftp = new Client();

sftp
  .connect({
    host: "127.0.0.1",
    port: "22",
    username: "username",
    password: "******",
  })
  .then(() => {
    return sftp.list("/pathname");
  })
  .then((data) => {
    console.log(data, "the data info");
  })
  .catch((err) => {
    console.log(err, "catch error");
  });

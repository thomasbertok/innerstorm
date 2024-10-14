import path from "path";
import FtpDeploy from "ftp-deploy";

const ftp_user = import.meta.env.VITE_FTP_USER;
const ftp_host = import.meta.env.VITE_FTP_HOST;
const ftp_remoteHost = import.meta.env.VITE_FTP_REMOTE_HOST;

const ftpDeploy = new FtpDeploy();

const config = {
  user: ftp_user,
  // Password optional, prompted if none given
  password: "",
  host: ftp_host,
  port: 21,
  localRoot: path.resolve(process.cwd(), "dist"),
  remoteRoot: ftp_remoteHost,
  // include: ["*", "**/*"],      // this would upload everything except dot files
  include: ["*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: true,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("\n Upload successfully finished:\n", res))
  .catch((err) => console.log("Error: ", err));

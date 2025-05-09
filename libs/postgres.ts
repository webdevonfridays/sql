import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

return new Promise((resolve, reject) => {
  exec(
    `docker cp ${localPath} ${containerId}:${containerPath}`,
    (error, stdout, stderr) => {
      if (error) return reject(stderr);
      resolve(stdout);
    }
  );
});

export async function restoreBackup(backupPath: string) {
  const { exec } = require("child_process");
  return new Promise((resolve, reject) => {
    exec(
      `psql -U postgres -h localhost -f ${backupPath}`,
      (error: any, stdout: any, stderr: any) => {
        if (error) reject(stderr);
        else resolve(stdout);
      }
    );
  });
}

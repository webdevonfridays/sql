import { exec } from "child_process";
import { Container } from "dockerode";

export async function restoreBackup(container: Container, backupPath: string) {
  const exec = await container.exec({
    Cmd: [
      "/bin/sh",
      "-c",
      "PGPASSWORD=password psql -U postgres -f /tmp/backup.sql",
    ],
    AttachStdout: true,
    AttachStderr: true,
  });
  await exec.start({});
}

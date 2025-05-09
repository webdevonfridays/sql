import { exec } from "child_process";
import Docker from "dockerode";

const docker = new Docker();

export async function createPostgresContainer() {
  return await docker.createContainer({
    Image: "postgres:latest",
    Env: ["POSTGRES_PASSWORD=mysecretpassword"],
    HostConfig: {
      PortBindings: { "5432/tcp": [{ HostPort: "5432" }] },
    },
    name: "pg-restore-container",
  });
}

export async function removePostgresContainer() {
  const containers = await docker.listContainers({ all: true });
  const existing = containers.find((c) =>
    c.Names.includes("/pg-restore-container")
  );

  if (existing) {
    const container = docker.getContainer(existing.Id);
    if (existing.State === "running") {
      await container.stop();
    }
    await container.remove();
  }
}

export async function copyToContainer(
  containerId: string,
  sourcePath: string,
  destPath: string
) {
  return new Promise((resolve, reject) => {
    exec(
      `docker cp ${sourcePath} ${containerId}:${destPath}`,

      (error, stdout, stderr) => {
        if (error) return reject(stderr);
        resolve(stdout);
      }
    );
  });
}

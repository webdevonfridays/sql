import { NextResponse } from "next/server";
import {
  createPostgresContainer,
  copyToContainer,
  removePostgresContainer,
} from "../../../libs/docker";
import { restoreBackup } from "../../../libs/postgres";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    // Clean up any existing container
    await removePostgresContainer();

    // Create new container
    const container = await createPostgresContainer();
    await container.start();

    // Wait for PostgreSQL to initialize
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Get uploaded file
    const formData = await request.formData();
    const file = formData.get("backup") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const filePath = path.join(uploadDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // Copy to container and restore
    await copyToContainer(container.id, filePath, "/tmp/backup.sql");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const res = await restoreBackup(container, "/tmp/backup.sql");
    // Clean up
    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      containerId: container.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

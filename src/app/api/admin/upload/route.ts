import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import fs from "fs/promises";
import path from "path";

async function checkAdminAccess() {
  const session = await auth();
  if (!session?.user || (session.user as any)?.role !== "ADMIN") {
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  if (!(await checkAdminAccess())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "courses");
    await fs.mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name) || ".png";
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const fileName = `${Date.now()}-${safeName}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const url = `/uploads/courses/${fileName}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

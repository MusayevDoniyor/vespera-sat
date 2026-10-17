import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    const decoded = decodeURIComponent(filename);
    const safeFilename = path.basename(decoded);
    const filePath = path.join(process.cwd(), "materials", safeFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Material file not found", filename: safeFilename },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.promises.readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${encodeURIComponent(safeFilename)}"`,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error: any) {
    console.error("Error serving material PDF:", error);
    return NextResponse.json(
      { error: "Failed to read material file", message: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const file = formData.get("image") as File | null;

    // default placeholder
    let imagePath = "/placeholder.png";

    if (file) {
      // Only write to disk in development (local)
      if (process.env.NODE_ENV === "development") {
        const bytes = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name) || ".png";
        const newFilename = uuid() + ext;

        const uploadFolder = path.join(
          process.cwd(),
          "public",
          "schoolImages"
        );
        if (!fs.existsSync(uploadFolder)) {
          fs.mkdirSync(uploadFolder, { recursive: true });
        }

        const filePath = path.join(uploadFolder, newFilename);
        fs.writeFileSync(filePath, bytes);

        imagePath = `/schoolImages/${newFilename}`;
      } else {
        // On Vercel (production) we keep placeholder
        imagePath = "/placeholder.png";
      }
    }

    const school = await prisma.school.create({
      data: { name, address, city, state, contact, email_id, image: imagePath },
    });

    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}


export async function GET() {
  const schools = await prisma.school.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json(schools);
}

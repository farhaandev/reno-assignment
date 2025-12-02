import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Get all schools
export async function GET() {
    try {
        const schools = await prisma.school.findMany(
            { orderBy: { id: "desc" } }
        );
        return NextResponse.json(schools);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch schools." }, { status: 500 });
    }
}

// Post a new school
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, address, city, state, contact, email_id, image } = body;

        if (!name || !address || !city || !state || !contact || !email_id) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const school = await prisma.school.create({
            data: {
                name,
                address,
                city,
                state,
                contact,
                email_id,
                image: image || "/placeholder.jpg",
            },
        });

        return NextResponse.json(school, { status: 201 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add school." }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Difficulty } from "@/generated/prisma"; 

function isDifficulty(value: string | null): value is Difficulty {
  return value === "mudah" || value === "menengah" || value === "sulit";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");

  if (!isDifficulty(level)) {
    return NextResponse.json(
      { error: "Invalid difficulty level. Harus salah satu dari: mudah, menengah, sulit." },
      { status: 400 }
    );
  }

  try {
    const samples = await prisma.sample.findMany({
      where: {
        difficulty: level,
      },
      include: {
        corrections: true,
      },
    });

    return NextResponse.json(samples);
  } catch (error) {
    console.error("Error fetching samples:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data sample." },
      { status: 500 }
    );
  }
}

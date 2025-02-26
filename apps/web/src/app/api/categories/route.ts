import { category, isCategory } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isCategory(data)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newCategory:category = {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl,
      description: data.description,
      marketIds: data.marketIds,
    };

    console.log(newCategory);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "An error occurred" },
      { status: 500 }
    );
  }
}


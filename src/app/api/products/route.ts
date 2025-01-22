import { isProduct, product } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isProduct(data)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newProduct: product = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      productPrice: data.productPrice,
      tags: data.tags,
      status: data.status || "inactive",
      sku: data.sku,
      barcode: data.barcode,
      categoryIds: data.categoryIds,
      farmerIds: data.farmerIds,
    };

    console.log(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "An error occurred" },
      { status: 500 }
    );
  }
}

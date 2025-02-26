import { coupon, isCoupon } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isCoupon(data)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newCoupon: coupon = {
      couponCode: data.couponCode,
      expiryDate: data.expiryDate,
      title: data.title,
      status: data.status || "inactive",
    };

    console.log(newCoupon);

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "An error occurred" },
      { status: 500 }
    );
  }
}

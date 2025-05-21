import { NextResponse } from "next/server";
import { getTopProducts } from "@/lib/queries/getTopProducts";

export async function GET() {
  try {
    const products = await getTopProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching top products:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



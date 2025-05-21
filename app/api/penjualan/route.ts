import { NextResponse } from "next/server";
import { getMonthlySales } from "@/lib/queries/getMonthlySales";

export async function GET() {
  try {
    const salesData = await getMonthlySales();
    return NextResponse.json(salesData);
  } catch (error: any) {
    console.error("Error fetching sales data:", error.message || error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

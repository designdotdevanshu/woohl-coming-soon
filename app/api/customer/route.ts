import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CustomerData from "@/models/CustomerData";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await CustomerData.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error fetching customer data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch customer data" },
      { status: 500 }
    );
  }
}

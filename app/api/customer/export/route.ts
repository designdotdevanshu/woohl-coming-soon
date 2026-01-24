import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CustomerData from "@/models/CustomerData";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await CustomerData.find().sort({ createdAt: -1 }).lean();

    // Convert to CSV format
    const headers = ["Name", "Email", "City", "Interests", "Created At"];
    const csvRows = [headers.join(",")];

    for (const entry of data) {
      const row = [
        entry.name || "",
        entry.email,
        entry.city || "",
        Array.isArray(entry.interests) ? entry.interests.join("; ") : "",
        entry.createdAt ? new Date(entry.createdAt).toISOString() : "",
      ];
      // Escape fields that might contain commas
      const escapedRow = row.map((field) => {
        if (typeof field === "string" && (field.includes(",") || field.includes('"'))) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      });
      csvRows.push(escapedRow.join(","));
    }

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="customer-waitlist-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting customer data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to export customer data" },
      { status: 500 }
    );
  }
}

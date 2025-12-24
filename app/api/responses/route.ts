import { NextRequest, NextResponse } from "next/server";
import { getFormData } from "@/actions/newsletter";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const ref = url.searchParams.get("ref")?.toLowerCase() ?? null;

  try {
    const data = await getFormData(ref);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Export error:", err);
    return new Response(JSON.stringify({ error: "Failed to export data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

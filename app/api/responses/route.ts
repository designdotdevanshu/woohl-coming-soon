import { NextResponse } from "next/server";
import { getFormData } from "@/actions/newsletter";
// import { getFormData } from "@/actions/form";
// import { FormDataDocument } from "@/types/FormData";

export async function GET() {
  try {
    const data = await getFormData();

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Export error:", err);
    return new Response(JSON.stringify({ error: "Failed to export data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

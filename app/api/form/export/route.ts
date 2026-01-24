import { type NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getFormData } from "@/actions/form";
import { FormDataDocument } from "@/types/FormData";

const HEADERS = ["Business Name", "Person Name", "Designation", "Other Designation", "Phone Email", "Website", "Product Categories", "Instagram Handle", "City", "State"];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const exportFormat = url.searchParams.get("format")?.toLowerCase() ?? "json";

  try {
    const data: FormDataDocument[] = await getFormData();

    const responseHandlers: Record<string, () => Response | Promise<Response>> = {
      csv: () => streamCSV(data),
      xlsx: () => generateXLSX(data),
      json: () =>
        new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    };

    const handler = responseHandlers[exportFormat] ?? responseHandlers.json;
    return handler();
  } catch (err) {
    console.error("Export error:", err);
    return new Response(JSON.stringify({ error: "Failed to export data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function sanitizeCSV(value: string | undefined): string {
  if (!value) return "";
  const escaped = value.replace(/"/g, '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

function streamCSV(data: FormDataDocument[]): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Header
      controller.enqueue(encoder.encode(HEADERS.join(",") + "\n"));

      for (const row of data) {
        const line = [row.businessName, row.personName, row.designation, row.otherDesignation, row.phoneEmail, row.website, row.productCategories, row.instagramHandle, row.city, row.state].map(sanitizeCSV).join(",");

        controller.enqueue(encoder.encode(line + "\n"));
      }

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=form-data.csv",
    },
  });
}

async function generateXLSX(data: FormDataDocument[]): Promise<Response> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Form Data");

  worksheet.addRow(HEADERS);

  for (const row of data) {
    worksheet.addRow([row.businessName, row.personName, row.designation, row.otherDesignation ?? "", row.phoneEmail, row.website ?? "", row.productCategories ?? "", row.instagramHandle ?? "", row.city, row.state]);
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=form-data.xlsx",
    },
  });
}

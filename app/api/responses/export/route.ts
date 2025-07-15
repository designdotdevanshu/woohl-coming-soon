import { type NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getFormData } from "@/actions/newsletter";

const HEADERS = ["_id", "email", "createdAt", "updatedAt"];

type DataType = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "" : date.toISOString(); // or use custom format
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const exportFormat = url.searchParams.get("format")?.toLowerCase() ?? "json";

  try {
    const data: DataType[] = await getFormData();

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

function sanitizeCSV(value: unknown): string {
  if (value === undefined || value === null) return "";
  const str = String(value).replace(/"/g, '""');
  return /[",\n]/.test(str) ? `"${str}"` : str;
}

function streamCSV(data: DataType[]): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(HEADERS.join(",") + "\n"));

      for (const row of data) {
        const line = [row._id, row.email, formatDate(row.createdAt), formatDate(row.updatedAt)].map(sanitizeCSV).join(",");

        controller.enqueue(encoder.encode(line + "\n"));
      }

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=early-access-signups.csv",
    },
  });
}

async function generateXLSX(data: DataType[]): Promise<Response> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Form DataType");

  worksheet.addRow(HEADERS);

  for (const row of data) {
    worksheet.addRow([row._id, row.email, formatDate(row.createdAt), formatDate(row.updatedAt)]);
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=early-access-signups.xlsx",
    },
  });
}

import { NextResponse } from "next/server";

export async function GET() {
  // Return an empty OK response to stop the 404 logs
  return NextResponse.json({ show: false });
}

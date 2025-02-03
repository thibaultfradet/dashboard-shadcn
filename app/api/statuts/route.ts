/* eslint-disable @typescript-eslint/no-unused-vars */
// Import prisma from your prisma setup file
import { prisma } from "@/src/lib/prisma";
// Import NextResponse from next/server
import { NextResponse } from "next/server";

// Create the GET endpoint
export async function GET() {
  try {
    // Fetch all records from the 'statut' table using Prisma
    const statuts = await prisma.statut.findMany();
    // Return the records as a JSON response with a status of 200
    return NextResponse.json(statuts, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

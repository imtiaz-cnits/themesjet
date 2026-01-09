import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET() {
  try {
    console.log("Starting Prisma Generation...");
    
    // Run the command
    const { stdout, stderr } = await execPromise("npx prisma generate");
    
    console.log("Output:", stdout);
    if (stderr) console.error("Error Output:", stderr);

    return NextResponse.json({ 
      success: true, 
      message: "Prisma Generated Successfully", 
      output: stdout 
    });
  } catch (error: any) {
    console.error("Generation Failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
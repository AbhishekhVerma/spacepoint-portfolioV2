import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: session.user.id }
    });

    return NextResponse.json(portfolio || {});
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Only extract the fields we want to update
    const { username, aboutText, missionLog, profileImage, themePrimaryColor } = data;

    const updatedPortfolio = await prisma.portfolio.upsert({
      where: { userId: session.user.id },
      update: {
        username: username || "operator",
        aboutText,
        missionLog,
        profileImage,
        themePrimaryColor,
      },
      create: {
        userId: session.user.id,
        username: username || "operator",
        aboutText,
        missionLog,
        profileImage,
        themePrimaryColor,
      }
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}

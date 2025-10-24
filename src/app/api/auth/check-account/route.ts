import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json({ active: true })
    }

    return NextResponse.json({ 
      active: user.isActive,
      exists: true
    })
  } catch (error) {
    console.error('Error checking account:', error)
    return NextResponse.json(
      { error: "Failed to check account" },
      { status: 500 }
    )
  }
}

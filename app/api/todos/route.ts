import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todo.findMany();
  console.log(todos);
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const todo = await prisma.todo.create({
      data: { title, done: false },
    });
    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { User, NewUser, users } from "@/schemas/user";
import { eq } from "drizzle-orm";

export async function GET(_: NextRequest) {
  const allUsers: User[] = await db.select().from(users);
  return NextResponse.json({ users: allUsers });
}

export async function POST(req: NextRequest) {
  const newUser: NewUser = await req.json();
  const createdUser = await db.insert(users).values(newUser).returning({
    id: users.id,
    name: users.name,
    email: users.email,
    createdAt: users.createdAt,
  });
  return NextResponse.json({ users: createdUser });
}

export async function PATCH(req: NextRequest) {
  const updateUser: User = await req.json();
  const user: User[] = await db
    .select()
    .from(users)
    .where(eq(users.id, updateUser.id));
  const updatedUser = await db
    .update(users)
    .set({
      ...user[0],
      ...updateUser,
    })
    .where(eq(users.id, updateUser.id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    });
  return NextResponse.json({ users: updatedUser });
}

export async function DELETE(req: NextRequest) {
  const deleteUser: User = await req.json();
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, deleteUser.id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    });
  return NextResponse.json({ users: deletedUser });
}

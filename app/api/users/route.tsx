import { NextResponse } from 'next/server';
import { generateUsers } from '@/services/userService';

export async function GET() {
  const users = generateUsers(50);
  return NextResponse.json(users);
}

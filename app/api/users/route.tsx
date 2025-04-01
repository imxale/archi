import { NextResponse } from 'next/server';
import { supabaseAdmin } from "@/services/supabaseClient";

export async function GET() {
  const { data: users, error } = await supabaseAdmin.from('user').select('*').gte('id', '00000000-0000-0000-0000-000000000000'); // Sécurisé pour Supabase
  return NextResponse.json(users);
}

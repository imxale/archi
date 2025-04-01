import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/services/supabaseClient';
import { generateUsers } from '@/services/userService';

export async function POST() {
  try {
    // Supprimer tous les utilisateurs existants
    const { error: deleteError } = await supabaseAdmin.from('user').delete().gte('id', '00000000-0000-0000-0000-000000000000'); // Sécurisé pour Supabase
    if (deleteError) throw deleteError;

    // Générer et insérer de nouveaux utilisateurs
    const newUsers = generateUsers(25);
    const { error: insertError } = await supabaseAdmin.from('user').insert(newUsers);
    if (insertError) throw insertError;

    return NextResponse.json({ message: 'Users reset successfully', count: newUsers.length }, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

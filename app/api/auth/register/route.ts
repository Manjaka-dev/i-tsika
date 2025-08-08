import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { z } from 'zod';

// Schéma de validation
const userSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validation des données
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Données invalides', errors: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Un utilisateur avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Création de l'utilisateur avec mot de passe haché
    const user = await db.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
        role: 'user',
      },
    });

    // Renvoyer l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}

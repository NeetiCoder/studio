"use server";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { z } from "zod";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "user_session";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function signUpWithEmail(values: unknown) {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    
    cookies().set(SESSION_COOKIE_NAME, idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: "Signed up successfully!" };
  } catch (error: any) {
    return { error: error.message };
  }
}

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function signInWithEmail(values: unknown) {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();

    cookies().set(SESSION_COOKIE_NAME, idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
    
    return { success: "Signed in successfully!" };
  } catch (error: any) {
    return { error: "Failed to sign in. Please check your credentials." };
  }
}

export async function handleSignOut() {
    await signOut(auth);
    cookies().delete(SESSION_COOKIE_NAME);
}

export async function checkUserSession() {
    return cookies().has(SESSION_COOKIE_NAME);
}

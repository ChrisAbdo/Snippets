"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let sessionCache: any = null;

async function getSession() {
  if (!sessionCache) {
    sessionCache = await getServerSession(authOptions);
  }
  return sessionCache;
}

export async function addSnippet(formData: FormData) {
  const session = await getSession();

  const title = String(formData.get("title"));
  const code = String(formData.get("code"));
  const language = String(formData.get("language"));

  const authorId = session?.user.id;
  const authorName = session?.user.name;

  try {
    await prisma.snippet.create({
      data: {
        title,
        code,
        language,
        authorId,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  revalidatePath("/profile");
  redirect(`/profile/${authorName}`);
}

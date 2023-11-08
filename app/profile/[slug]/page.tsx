import React from "react";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { notFound, redirect } from "next/navigation";
import ProfileSnippets from "@/components/snippets/display-profile-snippets";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ShareProfile } from "@/components/profile/share-profile";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: params.slug,
        mode: "insensitive",
      },
    },
  });

  if (!user) {
    console.log("user not found");
    notFound();
  }

  const snippets = await prisma.snippet.findMany({
    where: {
      author: {
        name: params.slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return (
    <div>
      <div className="mx-auto max-w-7xl py-10">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6">
            <Image
              // @ts-ignore
              src={user.image}
              alt="logo"
              width="64"
              height="64"
              className="rounded-full"
            />
            <h1>
              <div className="text-xl leading-6">
                <span className="font-semibold">{user.name}</span>&apos;s
                Snippets
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                <Badge variant="outline" className="font-mono">
                  {user.id.slice(0, 4)}...
                  {user.id.slice(-4)}
                </Badge>
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <ShareProfile userName={user.name} />
          </div>
        </div>
      </div>
      <ProfileSnippets
        snippets={snippets.map((snippet) => {
          return {
            id: snippet.id,
            title: snippet.title,
            code: snippet.code,
            language: snippet.language,
          };
        })}
      />
    </div>
  );
}

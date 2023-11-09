import React from "react";
import { prisma } from "@/prisma/db";
import ProfileCodeblock from "@/components/snippets/profile-codeblock";
import { ShareSnippet } from "@/components/snippets/share-snippet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AIExplanation from "@/components/snippets/ai-explanation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "@radix-ui/react-icons";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

  const snippets = await prisma.snippet.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      author: true,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: snippets?.author.name,
        mode: "insensitive",
      },
    },
    include: {
      snippets: true,
    },
  });

  return (
    <div>
      <div className="mt-4 mb-4 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            {snippets?.title}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {/* @ts-ignore */}
          <ShareSnippet snippetId={snippets?.id} />
        </div>
      </div>

      <Separator className="mb-4" />

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <h1 className="text-muted-foreground font-extralight text-sm">
              Snippet by{" "}
            </h1>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href={`/profile/${snippets?.author.name}`}
                  className="hover:underline"
                >
                  {snippets?.author.name}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    {/* @ts-ignore */}
                    <AvatarImage src={snippets?.author.image} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      {snippets?.author.name}
                    </h4>

                    <p className="text-sm">
                      {user?.snippets.length === 1
                        ? `${user?.snippets.length} Snippet`
                        : `${user?.snippets.length} Snippets`}
                    </p>

                    <div className="flex items-center pt-2">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <Badge variant="outline" className="font-mono">
            {snippets?.language}
          </Badge>
        </div>
      </div>

      <ProfileCodeblock snippets={snippets} />

      <Separator className="mt-6 mb-6" />

      <AIExplanation snippets={snippets} session={session} />
    </div>
  );
}

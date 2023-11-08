"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { CodeIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import ProfileDropdown from "./profile-dropdown";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "../ui/badge";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  return (
    <header
      className={`sticky top-0 border-b px-3 z-50 ${
        pathname === "/projects"
          ? "bg-background"
          : "supports-backdrop-blur:bg-background/80 backdrop-blur"
      }`}
    >
      <nav
        className="flex items-center justify-between py-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center space-x-1">
            <CodeIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="font-normal inline-block">Snippets</span>
          </Link>
          <div className="hidden md:flex md:gap-x-12">
            <Link
              href="/create"
              className={cn(
                "transition-colors hover:text-foreground/80 text-sm font-normal",
                pathname === "/create"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Create
            </Link>

            <Link
              href="/explore"
              className={cn(
                "transition-colors hover:text-foreground/80 text-sm font-normal",
                pathname === "/explore"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Explore
            </Link>

            {session ? (
              <Link
                href={`/profile/${session?.user?.name}`}
                className={cn(
                  "transition-colors hover:text-foreground/80 text-sm font-normal",
                  pathname.startsWith("/profile") &&
                    session.user.name === pathname.split("/")[2]
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Profile
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {/* <Menu className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          {session && <ProfileDropdown />}

          {!session && (
            <Button variant="default" onClick={() => signIn()}>
              Log in
            </Button>
          )}
          <div className="hidden md:flex">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

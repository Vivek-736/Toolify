"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-y-6 min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Toolify
      </h1>
      {!user ? <div className="flex gap-x-6">
        <SignInButton forceRedirectUrl="/dashboard">
          <Button className="cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton forceRedirectUrl="/dashboard">
          <Button className="cursor-pointer">
            Sign Up
          </Button>
        </SignUpButton>
      </div> : <div className="flex gap-x-6">
        <Link href="/dashboard">
          <Button className="cursor-pointer">
            Dashboard
          </Button>
        </Link>
      </div>}
    </div>
  )
};
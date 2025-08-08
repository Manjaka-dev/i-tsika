"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "@/components/dashboard/user-nav";

export function AuthStatus() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) return null;

  if (session?.user) {
    return <UserNav user={session.user} />;
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/login">Se connecter</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/register">S'inscrire</Link>
      </Button>
    </div>
  );
}

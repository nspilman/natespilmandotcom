"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeLogin } from "@/lib/atproto-oauth";

let callbackHandled = false;

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (callbackHandled) return;
    callbackHandled = true;
    completeLogin()
      .then(() => router.replace("/guestbook"))
      .catch((err) => {
        setError(String(err?.message ?? err));
        callbackHandled = false;
      });
  }, [router]);

  return (
    <main className="mx-auto max-w-xl p-8">
      {error ? (
        <>
          <h1 className="font-mono text-xl">Sign-in failed</h1>
          <p className="mt-2 text-sm opacity-70">{error}</p>
          <a className="mt-4 inline-block underline opacity-70 hover:opacity-100" href="/guestbook">
            ← back to the guestbook
          </a>
        </>
      ) : (
        <p className="font-mono text-sm opacity-50">signing you in…</p>
      )}
    </main>
  );
}

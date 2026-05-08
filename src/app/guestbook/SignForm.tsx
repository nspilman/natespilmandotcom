"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GUESTBOOK_COLLECTION,
  GUESTBOOK_OWNER_DID,
  resumeAgent,
  signOut,
  startLogin,
} from "@/lib/atproto-oauth";
import { getProfile, type BskyProfile } from "@/lib/profile";
import { addOptimistic } from "./optimistic-store";
import type { Did } from "@atcute/lexicons/syntax";

type Status =
  | { kind: "loading" }
  | { kind: "signed-out" }
  | { kind: "signed-in"; did: string }
  | { kind: "submitting"; did: string }
  | { kind: "submitted"; did: string }
  | { kind: "error"; did: string | null; message: string };

const MONO = { fontFamily: "'IBM Plex Mono', monospace" };
const SERIF = { fontFamily: "'IBM Plex Serif', serif" };

// site has global button {} rules. Inline reset wins on specificity and
// inherits font + color from the surrounding text.
const RESET_BTN: React.CSSProperties = {
  background: "transparent",
  border: 0,
  margin: 0,
  padding: 0,
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
  letterSpacing: "inherit",
  textTransform: "none",
};

export default function SignForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ kind: "loading" });
  const [handle, setHandle] = useState("");
  const [text, setText] = useState("");
  const [userProfile, setUserProfile] = useState<BskyProfile | null>(null);
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    resumeAgent().then(async (result) => {
      if (!result) {
        setStatus({ kind: "signed-out" });
        return;
      }
      setStatus({ kind: "signed-in", did: result.did });
      const profile = await getProfile(result.did);
      setUserProfile(profile);
    });
  }, []);

  async function onSignIn(e: FormEvent) {
    e.preventDefault();
    if (!handle.trim()) return;
    try {
      await startLogin(handle.trim());
    } catch (err) {
      setStatus({
        kind: "error",
        did: null,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status.kind !== "signed-in") return;
    if (!text.trim()) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    setStatus({ kind: "submitting", did: status.did });

    const result = await resumeAgent();
    if (!result) {
      setStatus({ kind: "signed-out" });
      return;
    }

    const record = {
      $type: GUESTBOOK_COLLECTION,
      subject: GUESTBOOK_OWNER_DID,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await result.rpc.post("com.atproto.repo.createRecord", {
        input: {
          repo: result.did as Did,
          collection: GUESTBOOK_COLLECTION,
          record,
        },
      });

      const atUri = (response.data as { uri?: string } | undefined)?.uri;
      if (atUri) {
        const profile = userProfile ?? (await getProfile(result.did));
        addOptimistic(
          {
            at_uri: atUri,
            author_did: result.did,
            text: record.text,
            created_at: record.createdAt,
          },
          profile,
        );
      }

      setStatus({ kind: "submitted", did: result.did });
      setText("");
      setTimeout(() => router.refresh(), 3000);
    } catch (err) {
      setStatus({
        kind: "error",
        did: result.did,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async function onSignOut() {
    await signOut();
    setStatus({ kind: "signed-out" });
    setUserProfile(null);
  }

  if (status.kind === "loading") {
    return <div className="h-32" />;
  }

  if (status.kind === "signed-out") {
    return (
      <form onSubmit={onSignIn}>
        <p className="mb-3 text-sm opacity-70">
          Sign in with your Bluesky account to leave a note.
        </p>
        <div className="flex items-stretch overflow-hidden rounded border border-white/15 bg-white/[0.02] transition-colors focus-within:border-[#fffe53]/50">
          <span className="flex items-center pl-3 text-sm opacity-30" style={MONO}>
            @
          </span>
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="alice.bsky.social"
            className="flex-1 bg-transparent px-2 py-2.5 text-base text-white placeholder:opacity-25 focus:outline-none"
            style={MONO}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="pr-3 text-[11px] uppercase tracking-wider text-white/60 hover:text-[#fffe53]"
            style={{ ...RESET_BTN, ...MONO, fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            sign in →
          </button>
        </div>
      </form>
    );
  }

  if (status.kind === "error") {
    return (
      <div className="border-l-2 border-red-500/60 pl-4 text-sm">
        <p className="opacity-90">Something went wrong.</p>
        <p className="mt-1 opacity-60" style={MONO}>
          {status.message}
        </p>
        <button
          onClick={() => setStatus({ kind: "signed-out" })}
          className="mt-3 text-xs uppercase tracking-wider text-white/60 hover:text-[#fffe53]"
          style={{ ...RESET_BTN, ...MONO, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          ← try again
        </button>
      </div>
    );
  }

  // signed-in / submitting / submitted

  const writingAs = userProfile?.handle ? (
    <a
      href={`https://bsky.app/profile/${userProfile.handle}`}
      target="_blank"
      rel="noreferrer"
      className="opacity-80 hover:text-[#fffe53] hover:opacity-100"
    >
      @{userProfile.handle}
    </a>
  ) : (
    <span className="opacity-50">{status.did}</span>
  );

  return (
    <div>
      <div className="mb-3 text-[11px] text-white/60" style={MONO}>
        writing as {writingAs}{" "}
        <button
          onClick={onSignOut}
          className="text-white/60 hover:text-[#fffe53]"
          style={{ ...RESET_BTN, ...MONO }}
        >
          (sign out)
        </button>
      </div>

      {status.kind === "submitted" ? (
        <div className="border-l-2 border-[#fffe53]/60 pl-4 text-sm">
          <p style={SERIF} className="text-base italic opacity-90">
            Note signed.
          </p>
          <p className="mt-1 opacity-60">
            It&rsquo;s yours, in your repo. The list below will catch up in a moment.
          </p>
          <button
            onClick={() => setStatus({ kind: "signed-in", did: status.did })}
            className="mt-3 text-xs uppercase tracking-wider text-white/60 hover:text-[#fffe53]"
            style={{ ...RESET_BTN, ...MONO, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            ← leave another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (emptyError) setEmptyError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            rows={4}
            maxLength={2000}
            placeholder="Leave a note…"
            className={`block w-full resize-none rounded border bg-white/[0.02] p-3 text-base text-white placeholder:italic placeholder:opacity-30 transition-colors focus:outline-none ${
              emptyError
                ? "border-red-400/60 focus:border-red-400/80"
                : "border-white/15 focus:border-[#fffe53]/50"
            }`}
            style={SERIF}
          />
          {emptyError && (
            <p className="mt-1 text-[11px] italic text-red-400/80" style={MONO}>
              A note can&rsquo;t be blank.
            </p>
          )}
          <div className="mt-2 flex items-center justify-between text-xs" style={MONO}>
            <span className="opacity-30">⌘↵ to send</span>
            <button
              type="submit"
              disabled={status.kind === "submitting"}
              className="uppercase tracking-wider text-white/80 hover:text-[#fffe53] disabled:cursor-not-allowed disabled:text-white/30 disabled:hover:text-white/30"
              style={{ ...RESET_BTN, ...MONO, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              {status.kind === "submitting" ? "signing…" : "sign the guestbook →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  getSnapshot,
  markDeleted,
  pruneConfirmed,
  subscribe,
  type GuestbookEntry,
} from "./optimistic-store";
import { resumeAgent } from "@/lib/atproto-oauth";
import type { BskyProfile } from "@/lib/profile";

type Props = {
  initialEntries: GuestbookEntry[];
  initialProfiles: Record<string, BskyProfile>;
};

const MONO = { fontFamily: "'IBM Plex Mono', monospace" };
const SERIF = { fontFamily: "'IBM Plex Serif', serif" };

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

function relativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = now - then;
  const min = 60 * 1000;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < min) return "just now";
  if (diff < hour) return `${Math.floor(diff / min)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < week) return `${Math.floor(diff / day)}d ago`;

  const d = new Date(iso);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

function parseAtUri(uri: string): { did: string; collection: string; rkey: string } {
  const stripped = uri.replace(/^at:\/\//, "");
  const [did, collection, rkey] = stripped.split("/");
  return { did, collection, rkey };
}

function EntryCard({
  entry,
  profile,
  pending,
  canDelete,
  deleting,
  onDelete,
}: {
  entry: GuestbookEntry;
  profile: BskyProfile | undefined;
  pending: boolean;
  canDelete: boolean;
  deleting: boolean;
  onDelete: () => void;
}) {
  const name = profile?.displayName || profile?.handle || "Someone";
  const handleText = profile?.handle ?? entry.author_did;
  const profileUrl = profile?.handle
    ? `https://bsky.app/profile/${profile.handle}`
    : `https://bsky.app/profile/${entry.author_did}`;

  return (
    <li className="group grid grid-cols-[auto_1fr] gap-x-4">
      {profile?.avatar ? (
        <Image
          src={profile.avatar}
          alt=""
          width={32}
          height={32}
          className="row-span-2 mt-1 h-8 w-8 rounded-full"
          unoptimized
        />
      ) : (
        <div className="row-span-2 mt-1 h-8 w-8 rounded-full bg-white/10" />
      )}

      <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium hover:text-[#fffe53]"
        >
          {name}
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-white/50 hover:text-[#fffe53]"
          style={MONO}
        >
          @{handleText}
        </a>
        <span className="text-xs text-white/25" style={MONO}>·</span>
        <time
          className="text-xs text-white/40"
          style={MONO}
          dateTime={entry.created_at}
          title={new Date(entry.created_at).toLocaleString()}
        >
          {relativeTime(entry.created_at)}
        </time>
        {pending && (
          <span className="text-xs italic text-white/40" style={MONO}>
            saving…
          </span>
        )}
        {canDelete && (
          <button
            onClick={onDelete}
            disabled={deleting}
            className="ml-auto inline-flex items-center text-white/30 transition-opacity hover:text-red-400 disabled:cursor-not-allowed disabled:hover:text-white/30 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            style={RESET_BTN}
            title="Remove this note"
            aria-label="Remove this note"
          >
            {deleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </header>

      <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed" style={SERIF}>
        {entry.text}
      </p>
    </li>
  );
}

export default function EntriesList({ initialEntries, initialProfiles }: Props) {
  const router = useRouter();
  const optimistic = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [currentDid, setCurrentDid] = useState<string | null>(null);
  const [deletingUri, setDeletingUri] = useState<string | null>(null);

  useEffect(() => {
    resumeAgent().then((result) => {
      setCurrentDid(result?.did ?? null);
    });
  }, []);

  useEffect(() => {
    pruneConfirmed(new Set(initialEntries.map((e) => e.at_uri)));
  }, [initialEntries]);

  const merged = useMemo(() => {
    const realUris = new Set(initialEntries.map((e) => e.at_uri));
    const pending = optimistic.entries
      .filter((e) => !realUris.has(e.at_uri))
      .map((entry) => ({ entry, pending: true }));
    const confirmed = initialEntries.map((entry) => ({ entry, pending: false }));
    return [...pending, ...confirmed].filter(
      ({ entry }) => !optimistic.deletedUris.has(entry.at_uri),
    );
  }, [optimistic.entries, optimistic.deletedUris, initialEntries]);

  async function onDelete(uri: string) {
    const ok = window.confirm("Remove this note? This deletes the record from your atproto repo.");
    if (!ok) return;

    setDeletingUri(uri);
    const result = await resumeAgent();
    if (!result) {
      setDeletingUri(null);
      return;
    }

    const { did, collection, rkey } = parseAtUri(uri);
    if (did !== result.did) {
      // not the owner; abort
      setDeletingUri(null);
      return;
    }

    try {
      await result.rpc.post("com.atproto.repo.deleteRecord", {
        input: { repo: did, collection, rkey },
      });
      markDeleted(uri);
      setTimeout(() => router.refresh(), 3000);
    } catch (err) {
      console.error("[guestbook] delete failed:", err);
      window.alert("Could not delete the note. Please try again.");
    } finally {
      setDeletingUri(null);
    }
  }

  if (merged.length === 0) {
    return (
      <p className="text-sm italic text-white/40" style={SERIF}>
        An empty page, for now.
      </p>
    );
  }

  return (
    <ul className="space-y-10">
      {merged.map(({ entry, pending }) => (
        <EntryCard
          key={entry.at_uri}
          entry={entry}
          profile={optimistic.profiles[entry.author_did] ?? initialProfiles[entry.author_did]}
          pending={pending}
          canDelete={currentDid !== null && entry.author_did === currentDid}
          deleting={deletingUri === entry.at_uri}
          onDelete={() => onDelete(entry.at_uri)}
        />
      ))}
    </ul>
  );
}

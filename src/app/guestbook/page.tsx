import SignForm from "./SignForm";
import EntriesList from "./EntriesList";
import { GUESTBOOK_COLLECTION, GUESTBOOK_OWNER_DID } from "@/lib/atproto-oauth";
import { getRecord } from "@/lib/atproto-fetch";
import { getProfiles, type BskyProfile } from "@/lib/profile";
import type { GuestbookEntry } from "./optimistic-store";

export const dynamic = "force-dynamic";

const CONSTELLATION = "https://constellation.microcosm.blue";

type ConstellationResponse = {
  total: number;
  records: Array<{ did: string; collection: string; rkey: string }>;
  cursor: string | null;
};

type GuestbookRecord = {
  subject?: string;
  text?: string;
  createdAt?: string;
};

async function getEntries(): Promise<GuestbookEntry[]> {
  const url = new URL(`${CONSTELLATION}/xrpc/blue.microcosm.links.getBacklinks`);
  url.searchParams.set("subject", GUESTBOOK_OWNER_DID);
  url.searchParams.set("source", `${GUESTBOOK_COLLECTION}:subject`);
  url.searchParams.set("limit", "100");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error("[guestbook] constellation query failed:", res.status, await res.text());
    return [];
  }
  const data = (await res.json()) as ConstellationResponse;

  const fetched = await Promise.all(
    data.records.map(async (ref) => {
      const rec = await getRecord<GuestbookRecord>(ref.did, ref.collection, ref.rkey);
      if (!rec) return null;
      if (rec.value.subject !== GUESTBOOK_OWNER_DID) return null;
      if (!rec.value.text || !rec.value.createdAt) return null;
      return {
        at_uri: rec.uri,
        author_did: ref.did,
        text: rec.value.text,
        created_at: rec.value.createdAt,
      };
    }),
  );

  return fetched
    .filter((e): e is GuestbookEntry => e !== null)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export default async function GuestbookPage() {
  const entries = await getEntries();
  const profileMap = await getProfiles(entries.map((e) => e.author_did));
  const initialProfiles: Record<string, BskyProfile> = {};
  for (const [did, profile] of profileMap) initialProfiles[did] = profile;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">
      <header className="mb-16">
        <h1
          className="text-5xl font-light tracking-tight text-[#fffe53]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Guestbook
        </h1>
        <div className="mt-4 h-px w-12 bg-[#fffe53]/40" />
        <p className="mt-6 max-w-md text-sm leading-relaxed opacity-70">
          A small archive of notes left by visitors. Each note is signed by its author
          and lives in their own atproto repo — I just keep the list.
        </p>
      </header>

      <SignForm />

      <section className="mt-20">
        <header className="mb-10 flex items-baseline gap-3">
          <h2
            className="text-xs uppercase tracking-[0.25em] opacity-60"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Notes
          </h2>
          {entries.length > 0 && (
            <span
              className="text-xs opacity-30"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {entries.length}
            </span>
          )}
        </header>
        <EntriesList initialEntries={entries} initialProfiles={initialProfiles} />
      </section>
    </main>
  );
}

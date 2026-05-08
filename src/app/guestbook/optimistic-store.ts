import type { BskyProfile } from "@/lib/profile";

export type GuestbookEntry = {
  at_uri: string;
  author_did: string;
  text: string;
  created_at: string;
};

type Snapshot = {
  entries: GuestbookEntry[];
  profiles: Record<string, BskyProfile>;
  deletedUris: Set<string>;
};

let snapshot: Snapshot = { entries: [], profiles: {}, deletedUris: new Set() };
const listeners = new Set<() => void>();

function emit() {
  snapshot = {
    entries: snapshot.entries,
    profiles: snapshot.profiles,
    deletedUris: snapshot.deletedUris,
  };
  listeners.forEach((l) => l());
}

export function addOptimistic(entry: GuestbookEntry, profile: BskyProfile | null) {
  snapshot.entries = [entry, ...snapshot.entries];
  if (profile) {
    snapshot.profiles = { ...snapshot.profiles, [entry.author_did]: profile };
  }
  emit();
}

export function markDeleted(uri: string) {
  if (snapshot.deletedUris.has(uri)) return;
  const next = new Set(snapshot.deletedUris);
  next.add(uri);
  snapshot.deletedUris = next;
  // Also drop from optimistic adds — covers deleting an entry that hasn't
  // been confirmed by Constellation yet.
  snapshot.entries = snapshot.entries.filter((e) => e.at_uri !== uri);
  emit();
}

export function pruneConfirmed(realUris: Set<string>) {
  let changed = false;

  const remaining = snapshot.entries.filter((e) => !realUris.has(e.at_uri));
  if (remaining.length !== snapshot.entries.length) {
    snapshot.entries = remaining;
    changed = true;
  }

  // Drop deletedUris that the server has now caught up on (no longer in real list).
  const stillDeleted = new Set<string>();
  for (const uri of snapshot.deletedUris) {
    if (realUris.has(uri)) stillDeleted.add(uri);
  }
  if (stillDeleted.size !== snapshot.deletedUris.size) {
    snapshot.deletedUris = stillDeleted;
    changed = true;
  }

  if (changed) emit();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Snapshot {
  return snapshot;
}

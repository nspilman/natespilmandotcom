export type BskyProfile = {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  description?: string;
};

const PUBLIC_APPVIEW = "https://public.api.bsky.app";

export async function getProfile(did: string): Promise<BskyProfile | null> {
  try {
    const r = await fetch(
      `${PUBLIC_APPVIEW}/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(did)}`,
      { next: { revalidate: 300 } },
    );
    if (!r.ok) return null;
    return (await r.json()) as BskyProfile;
  } catch {
    return null;
  }
}

export async function getProfiles(dids: string[]): Promise<Map<string, BskyProfile>> {
  const unique = Array.from(new Set(dids));
  const entries = await Promise.all(
    unique.map(async (did) => [did, await getProfile(did)] as const),
  );
  const map = new Map<string, BskyProfile>();
  for (const [did, profile] of entries) {
    if (profile) map.set(did, profile);
  }
  return map;
}

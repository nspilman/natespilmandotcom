type DidDocument = {
  service?: Array<{ id: string; type?: string; serviceEndpoint?: string }>;
};

const FALLBACK_PDS = "https://bsky.social";

export async function resolvePds(did: string): Promise<string> {
  if (did.startsWith("did:plc:")) {
    try {
      const r = await fetch(`https://plc.directory/${did}`, {
        next: { revalidate: 3600 },
      });
      if (!r.ok) return FALLBACK_PDS;
      const doc = (await r.json()) as DidDocument;
      const svc = doc.service?.find(
        (s) => s.id === "#atproto_pds" || s.type === "AtprotoPersonalDataServer",
      );
      return svc?.serviceEndpoint ?? FALLBACK_PDS;
    } catch {
      return FALLBACK_PDS;
    }
  }
  if (did.startsWith("did:web:")) {
    return `https://${did.slice("did:web:".length)}`;
  }
  return FALLBACK_PDS;
}

export type AtprotoRecord<T = unknown> = {
  uri: string;
  cid: string;
  value: T;
};

export async function getRecord<T>(
  did: string,
  collection: string,
  rkey: string,
): Promise<AtprotoRecord<T> | null> {
  const pds = await resolvePds(did);
  const url = new URL(`${pds}/xrpc/com.atproto.repo.getRecord`);
  url.searchParams.set("repo", did);
  url.searchParams.set("collection", collection);
  url.searchParams.set("rkey", rkey);
  try {
    const r = await fetch(url, { next: { revalidate: 60 } });
    if (!r.ok) return null;
    return (await r.json()) as AtprotoRecord<T>;
  } catch {
    return null;
  }
}

// AT Protocol data layer for standard.site publications

const DID = "did:plc:c7frv4rcitff3p2nh7of5bcv";
const PDS_HOST = "https://oyster.us-east.host.bsky.network";

// --- Types ---

export interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: FacetFeature[];
}

export type FacetFeature =
  | { $type: string; uri: string } // link
  | { $type: string }; // bold, italic, code

export interface StandardPublication {
  $type: "site.standard.publication";
  url: string;
  name: string;
  description?: string;
  icon?: { ref: { $link: string }; mimeType: string; size: number };
  basicTheme?: {
    background: { r: number; g: number; b: number };
    foreground: { r: number; g: number; b: number };
    accent: { r: number; g: number; b: number };
    accentForeground: { r: number; g: number; b: number };
  };
}

export interface StandardDocument {
  $type: "site.standard.document";
  site: string;
  title: string;
  publishedAt: string;
  path?: string;
  description?: string;
  coverImage?: { ref: { $link: string }; mimeType: string; size: number };
  content?: LeafletContent | PcktContent | Record<string, unknown>;
  textContent?: string;
  tags?: string[];
  updatedAt?: string;
}

// Leaflet content types
export interface LeafletContent {
  $type: "pub.leaflet.content";
  pages: LeafletPage[];
}

export interface LeafletPage {
  $type: string;
  blocks?: { block: LeafletBlock }[];
  // canvas pages have spatial data we won't render
}

export type LeafletBlock =
  | { $type: "pub.leaflet.blocks.text"; plaintext: string; facets?: Facet[] }
  | {
      $type: "pub.leaflet.blocks.header";
      level: number;
      plaintext: string;
      facets?: Facet[];
    }
  | {
      $type: "pub.leaflet.blocks.code";
      plaintext: string;
      language?: string;
      syntaxHighlightingTheme?: string;
    }
  | {
      $type: "pub.leaflet.blocks.image";
      image: { ref: { $link: string }; mimeType: string };
      aspectRatio?: { width: number; height: number };
    }
  | { $type: "pub.leaflet.blocks.unorderedList"; children: LeafletListItem[] }
  | { $type: "pub.leaflet.blocks.horizontalRule" };

export interface LeafletListItem {
  $type: string;
  content: LeafletBlock;
  children?: LeafletListItem[];
}

// pckt content types
export interface PcktContent {
  $type: "blog.pckt.content";
  items: PcktBlock[];
}

export type PcktBlock =
  | { $type: "blog.pckt.block.text"; plaintext: string; facets?: Facet[] }
  | { $type: "blog.pckt.block.heading"; level: number; plaintext: string }
  | {
      $type: "blog.pckt.block.image";
      attrs: {
        blob: { ref: { $link: string }; mimeType: string };
        alt?: string;
        width?: number;
        align?: string;
      };
    }
  | { $type: "blog.pckt.block.bulletList"; content: PcktListItem[] };

export interface PcktListItem {
  $type: string;
  content: PcktBlock[];
}

// Wrapper types from the API
export interface ATRecord<T> {
  uri: string;
  cid: string;
  value: T;
}

export interface PublicationWithDocs {
  publication: ATRecord<StandardPublication>;
  documents: ATRecord<StandardDocument>[];
}

// --- Fetch helpers ---

const fetchOptions: RequestInit = { next: { revalidate: 300 } };

async function xrpc<T>(
  method: string,
  params: Record<string, string>
): Promise<T> {
  const url = new URL(`${PDS_HOST}/xrpc/${method}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), fetchOptions);
  if (!res.ok) {
    throw new Error(`XRPC ${method} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchPublications(): Promise<
  ATRecord<StandardPublication>[]
> {
  const data = await xrpc<{ records: ATRecord<StandardPublication>[] }>(
    "com.atproto.repo.listRecords",
    { repo: DID, collection: "site.standard.publication", limit: "50" }
  );
  return data.records;
}

export async function fetchDocuments(): Promise<
  ATRecord<StandardDocument>[]
> {
  const allRecords: ATRecord<StandardDocument>[] = [];
  let cursor: string | undefined;

  do {
    const params: Record<string, string> = {
      repo: DID,
      collection: "site.standard.document",
      limit: "100",
    };
    if (cursor) params.cursor = cursor;

    const data = await xrpc<{
      records: ATRecord<StandardDocument>[];
      cursor?: string;
    }>("com.atproto.repo.listRecords", params);

    allRecords.push(...data.records);
    cursor = data.records.length > 0 ? data.cursor : undefined;
  } while (cursor);

  return allRecords;
}

export async function fetchDocument(
  rkey: string
): Promise<ATRecord<StandardDocument>> {
  const data = await xrpc<ATRecord<StandardDocument>>(
    "com.atproto.repo.getRecord",
    { repo: DID, collection: "site.standard.document", rkey }
  );
  return data;
}

export function blobUrl(cid: string): string {
  return `${PDS_HOST}/xrpc/com.atproto.sync.getBlob?did=${DID}&cid=${cid}`;
}

export function rkeyFromUri(uri: string): string {
  return uri.split("/").pop() || "";
}

export function groupDocumentsByPublication(
  publications: ATRecord<StandardPublication>[],
  documents: ATRecord<StandardDocument>[]
): PublicationWithDocs[] {
  return publications.map((pub) => ({
    publication: pub,
    documents: documents
      .filter((doc) => doc.value.site === pub.uri)
      .sort(
        (a, b) =>
          new Date(b.value.publishedAt).getTime() -
          new Date(a.value.publishedAt).getTime()
      ),
  }));
}

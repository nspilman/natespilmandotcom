import {
  configureOAuth,
  createAuthorizationUrl,
  finalizeAuthorization,
  getSession,
  deleteStoredSession,
  OAuthUserAgent,
} from "@atcute/oauth-browser-client";
import { Client } from "@atcute/client";
import {
  CompositeDidDocumentResolver,
  LocalActorResolver,
  PlcDidDocumentResolver,
  WebDidDocumentResolver,
  XrpcHandleResolver,
} from "@atcute/identity-resolver";
import { scope as atprotoScope } from "@atcute/oauth-types";
// Triggers TypeScript module augmentation so `Client.post()` knows about
// `com.atproto.repo.createRecord` and `com.atproto.repo.deleteRecord`.
// Without this, those procedure names are typed as `never` at build time.
import type {} from "@atcute/atproto";
import type { ActorIdentifier, Did, Nsid } from "@atcute/lexicons/syntax";

export const GUESTBOOK_OWNER_DID = "did:plc:c7frv4rcitff3p2nh7of5bcv" as Did;
export const GUESTBOOK_COLLECTION = "com.natespilman.guestbook.entry" as Nsid;

// Least-privilege scope: just the base atproto identity claim plus write access
// to the single collection this app uses. No `transition:generic`, no other
// record types. The `repo` helper grants create/update/delete by default.
export const OAUTH_SCOPE = [
  "atproto",
  atprotoScope.repo({ collection: [GUESTBOOK_COLLECTION] }),
].join(" ");

const STORED_DID_KEY = "atproto:did";

function getOAuthMetadata() {
  if (typeof window !== "undefined" && window.location.hostname === "127.0.0.1") {
    const redirectUri = `http://127.0.0.1:${window.location.port}/oauth/callback`;
    const clientId =
      `http://localhost?redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(OAUTH_SCOPE)}`;
    return { client_id: clientId, redirect_uri: redirectUri };
  }
  return {
    client_id: "https://natespilman.com/oauth-client-metadata.json",
    redirect_uri: "https://natespilman.com/oauth/callback",
  };
}

let configured = false;
function ensureConfigured() {
  if (configured) return;
  configureOAuth({
    metadata: getOAuthMetadata(),
    identityResolver: new LocalActorResolver({
      handleResolver: new XrpcHandleResolver({
        serviceUrl: "https://public.api.bsky.app",
      }),
      didDocumentResolver: new CompositeDidDocumentResolver({
        methods: {
          plc: new PlcDidDocumentResolver(),
          web: new WebDidDocumentResolver(),
        },
      }),
    }),
  });
  configured = true;
}

export async function startLogin(handle: string) {
  ensureConfigured();
  const url = await createAuthorizationUrl({
    target: { type: "account", identifier: handle as ActorIdentifier },
    scope: OAUTH_SCOPE,
  });
  await new Promise((r) => setTimeout(r, 200));
  window.location.assign(url);
}

export async function completeLogin() {
  ensureConfigured();

  const hashParams = new URLSearchParams(location.hash.slice(1));
  const searchParams = new URLSearchParams(location.search.slice(1));
  const params = hashParams.has("code") || hashParams.has("state") ? hashParams : searchParams;

  history.replaceState(null, "", location.pathname);

  const result = await finalizeAuthorization(params);
  const session = result.session as { info?: { sub?: string }; did?: string };
  const did = session.info?.sub ?? session.did;
  if (!did) throw new Error("session has no DID");

  localStorage.setItem(STORED_DID_KEY, did);
  return did;
}

export function getStoredDid(): string | null {
  return localStorage.getItem(STORED_DID_KEY);
}

type ResumedAgent = { did: string; agent: OAuthUserAgent; rpc: Client };

let resumeInFlight: Promise<ResumedAgent | null> | null = null;

export function resumeAgent(): Promise<ResumedAgent | null> {
  if (resumeInFlight) return resumeInFlight;
  resumeInFlight = doResume();
  resumeInFlight.finally(() => {
    resumeInFlight = null;
  });
  return resumeInFlight;
}

async function doResume(): Promise<ResumedAgent | null> {
  ensureConfigured();
  const did = getStoredDid();
  if (!did) return null;
  try {
    const session = await getSession(did as any, { allowStale: true });
    const agent = new OAuthUserAgent(session);
    const rpc = new Client({ handler: agent });
    return { did, agent, rpc };
  } catch {
    localStorage.removeItem(STORED_DID_KEY);
    return null;
  }
}

export async function signOut() {
  ensureConfigured();
  const did = getStoredDid();
  if (!did) return;
  try {
    const session = await getSession(did as Did, { allowStale: true });
    await new OAuthUserAgent(session).signOut();
  } catch {
    deleteStoredSession(did as Did);
  } finally {
    localStorage.removeItem(STORED_DID_KEY);
  }
}

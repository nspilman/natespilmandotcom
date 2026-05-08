import { AtpAgent } from "@atproto/api";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import "dotenv/config";

const LEXICON_COLLECTION = "com.atproto.lexicon.schema";

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("usage: bun src/lib/publish-lexicon.ts <path-to-lexicon.json>");
    process.exit(1);
  }

  const handle = process.env.ATPROTO_HANDLE;
  const password = process.env.ATPROTO_APP_PASSWORD;
  if (!handle || !password) {
    console.error("missing ATPROTO_HANDLE or ATPROTO_APP_PASSWORD in env");
    process.exit(1);
  }

  const lexicon = JSON.parse(readFileSync(resolve(filePath), "utf8"));
  const nsid: string | undefined = lexicon.id;
  if (!nsid) {
    console.error("lexicon JSON is missing required `id` field");
    process.exit(1);
  }

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier: handle, password });
  const did = agent.session!.did;

  const result = await agent.com.atproto.repo.putRecord({
    repo: did,
    collection: LEXICON_COLLECTION,
    rkey: nsid,
    record: lexicon,
  });

  console.log(`published ${nsid}`);
  console.log(`  uri: ${result.data.uri}`);
  console.log(`  cid: ${result.data.cid}`);
  console.log(`  view: https://pdsls.dev/at/${did}/${LEXICON_COLLECTION}/${nsid}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

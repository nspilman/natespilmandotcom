// standard.site publication verification: proves natespilman.com owns this record.
import { SITE_PUBLICATION_URI } from "@/lib/standard-site";

export function GET() {
  return new Response(SITE_PUBLICATION_URI, {
    headers: { "Content-Type": "text/plain" },
  });
}

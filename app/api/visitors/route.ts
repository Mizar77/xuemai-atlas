import { desc, sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { visitorCountryCounts } from "../../../db/schema";

const githubPagesOrigin = "https://mizar77.github.io";

function corsHeaders(request: Request): Record<string, string> {
  return request.headers.get("origin") === githubPagesOrigin
    ? { "Access-Control-Allow-Origin": githubPagesOrigin, Vary: "Origin" }
    : {};
}

function json(request: Request, body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  Object.entries(corsHeaders(request)).forEach(([key, value]) => headers.set(key, value));
  headers.set("Cache-Control", "no-store");
  return Response.json(body, { ...init, headers });
}

function countryCode(request: Request) {
  const cloudflareRequest = request as Request & { cf?: { country?: string } };
  const value = cloudflareRequest.cf?.country ?? request.headers.get("cf-ipcountry") ?? "";
  return /^[A-Z]{2}$/.test(value) ? value : undefined;
}

async function snapshot() {
  const db = getDb();
  const countries = await db.select({ countryCode: visitorCountryCounts.countryCode, visits: visitorCountryCounts.visits })
    .from(visitorCountryCounts)
    .orderBy(desc(visitorCountryCounts.visits), visitorCountryCounts.countryCode)
    .limit(100);
  return { totalVisits: countries.reduce((sum, item) => sum + item.visits, 0), countries };
}

export async function OPTIONS(request: Request) {
  if (request.headers.get("origin") !== githubPagesOrigin) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { ...corsHeaders(request), "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Max-Age": "86400" } });
}

export async function GET(request: Request) {
  try {
    return json(request, await snapshot());
  } catch {
    return json(request, { totalVisits: 0, countries: [], error: "访问统计暂不可用。" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const code = countryCode(request);
    if (code) {
      const now = new Date().toISOString();
      const db = getDb();
      await db.insert(visitorCountryCounts).values({ countryCode: code, visits: 1, firstSeenAt: now, lastSeenAt: now })
        .onConflictDoUpdate({
          target: visitorCountryCounts.countryCode,
          set: { visits: sql`${visitorCountryCounts.visits} + 1`, lastSeenAt: now },
        });
    }
    return json(request, await snapshot());
  } catch {
    return json(request, { totalVisits: 0, countries: [], error: "访问统计暂不可用。" }, { status: 503 });
  }
}

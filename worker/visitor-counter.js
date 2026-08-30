const GITHUB_ORIGIN = "https://mizar77.github.io";

function corsHeaders(request) {
  return request.headers.get("Origin") === GITHUB_ORIGIN
    ? {
        "Access-Control-Allow-Origin": GITHUB_ORIGIN,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {};
}

function json(request, body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      ...corsHeaders(request),
      "Cache-Control": "no-store",
    },
  });
}

async function snapshot(env) {
  const result = await env.DB.prepare(
    "SELECT country_code AS countryCode, visits FROM visitor_country_counts ORDER BY visits DESC, country_code LIMIT 100",
  ).all();
  const countries = result.results ?? [];
  return {
    totalVisits: countries.reduce((sum, item) => sum + Number(item.visits || 0), 0),
    countries,
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return json(request, { ok: true, service: "xuemai-atlas visitor counter" });
    }

    if (url.pathname !== "/api/visitors") {
      return json(request, { error: "Not found" }, 404);
    }

    if (request.method === "OPTIONS") {
      if (request.headers.get("Origin") !== GITHUB_ORIGIN) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    try {
      if (request.method === "GET") {
        return json(request, await snapshot(env));
      }

      if (request.method === "POST") {
        const country = request.cf?.country || request.headers.get("cf-ipcountry") || "";
        if (/^[A-Z]{2}$/.test(country)) {
          const now = new Date().toISOString();
          await env.DB.prepare(
            "INSERT INTO visitor_country_counts (country_code, visits, first_seen_at, last_seen_at) VALUES (?, 1, ?, ?) ON CONFLICT(country_code) DO UPDATE SET visits = visits + 1, last_seen_at = excluded.last_seen_at",
          )
            .bind(country, now, now)
            .run();
        }
        return json(request, await snapshot(env));
      }

      return json(request, { error: "Method not allowed" }, 405);
    } catch (error) {
      console.error("visitor-counter", error);
      return json(
        request,
        { totalVisits: 0, countries: [], error: "Visitor statistics unavailable" },
        503,
      );
    }
  },
};

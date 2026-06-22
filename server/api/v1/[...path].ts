import { defineCachedHandler } from "nitro/cache";

const WALLHAVEN_API_BASE = "https://wallhaven.cc";

export default defineCachedHandler(async (event) => {
  const apiKey = event.req.headers.get("x-api-key");
  const url = `${WALLHAVEN_API_BASE}${event.url.pathname}${event.url.search}`;

  const headers: Record<string, string> = {};
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const response = await fetch(url, { headers });
  return response.json();
}, {
  maxAge: 60 * 10,
  swr: true,
  varies: ["x-api-key"],
});

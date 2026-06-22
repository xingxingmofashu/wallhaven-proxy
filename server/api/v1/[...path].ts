import { defineHandler } from "nitro";

const WALLHAVEN_API_BASE = "https://wallhaven.cc";

export default defineHandler(async (event) => {
  const apiKey = event.context.params?.apiKey || event.req.headers.get("x-api-key");
  const url = `${WALLHAVEN_API_BASE}${event.url.pathname}${event.url.search}`;
  const headers: Record<string, string> = {};

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }
  const response = await fetch(url, { headers });
  return await response.json();

});
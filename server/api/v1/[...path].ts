const WALLHAVEN_API_BASE = "https://wallhaven.cc/api/v1";

export default defineHandler(async (event) => {
  const { path } = event.context.params;
  const wallhavenPath = path
    ? `/${Array.isArray(path) ? path.join("/") : path}`
    : "";
  const url = `${WALLHAVEN_API_BASE}${wallhavenPath}${event.url.search}`;

  const headers: Record<string, string> = {};

  const clientKey = event.request.headers.get("x-api-key");
  if (clientKey) {
    headers["X-API-Key"] = clientKey;
  }

  const response = await fetch(url, { headers });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});

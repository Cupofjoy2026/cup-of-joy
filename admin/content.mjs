import { getStore } from "@netlify/blobs";

const PASSWORD = "cupofjoy2026";
const store = getStore("cup-of-joy-content");

export default async (req) => {
  if (req.method === "GET") {
    const data = await store.get("site", { type: "json" });
    return new Response(JSON.stringify({ data: data || null }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  }

  if (req.method === "POST") {
    if (req.headers.get("x-admin-password") !== PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
    const data = await req.json();
    await store.setJSON("site", data);
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

import { NextResponse } from "next/server";
import { backendReady, SUPABASE_KEY, SUPABASE_URL } from "@/lib/backend";

const KINDS = ["order", "booking", "shop", "salon"] as const;
const PHONE_RE = /^0[567]\d{8}$/;

/** Reçoit commandes, rendez-vous et demandes d'inscription, et les enregistre dans la table `submissions`. */
export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > 20_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });

  let body: { kind?: string; payload?: Record<string, unknown> };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const { kind, payload } = body;
  if (!kind || !(KINDS as readonly string[]).includes(kind) || !payload || typeof payload !== "object")
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });

  const phone = String(payload.phone ?? "").replace(/[\s.-]/g, "");
  if (!PHONE_RE.test(phone)) return NextResponse.json({ ok: false, error: "bad_phone" }, { status: 400 });

  if (!backendReady) return NextResponse.json({ ok: true, demo: true });

  const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY!,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ kind, phone, payload }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: "storage" }, { status: 502 });
  return NextResponse.json({ ok: true, demo: false });
}

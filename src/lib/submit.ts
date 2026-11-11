export type SubmitKind = "order" | "booking" | "shop" | "salon";
export type SubmitResult = { ok: true; demo: boolean } | { ok: false };

/** Envoie une commande, un rendez-vous ou une demande d'inscription au serveur. */
export async function submit(kind: SubmitKind, payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, payload }),
    });
    const data = await res.json();
    return res.ok && data.ok ? { ok: true, demo: Boolean(data.demo) } : { ok: false };
  } catch {
    return { ok: false };
  }
}

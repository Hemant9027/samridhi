/** Client-side JSON submit helper for enquiry forms. */
export interface ApiResult {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function submitJson(
  url: string,
  body: unknown,
): Promise<{ status: number; data: ApiResult }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let data: ApiResult = { ok: res.ok };
    try {
      data = (await res.json()) as ApiResult;
    } catch {
      // Non-JSON error page (e.g. proxy downtime) — fall through to a generic message.
    }
    return { status: res.status, data };
  } catch {
    return {
      status: 0,
      data: {
        ok: false,
        message:
          "The request could not be sent. Check your connection and try again.",
      },
    };
  }
}

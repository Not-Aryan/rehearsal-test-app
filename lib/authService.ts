/**
 * Client-side helper: sends username/password to the backend
 * and returns the JWT (or any token string your API issues).
 */
export async function login(
  username: string,
  password: string
): Promise<string> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  let data: { token?: string; error?: string } | null = null;

  try {
    data = (await res.json()) as { token?: string; error?: string };
  } catch {
    // Ignore JSON parse errors; we'll fall back to default messages below.
  }

  if (!res.ok) {
    const message =
      typeof data?.error === "string" && data.error.trim().length > 0
        ? data.error
        : "Login failed";
    throw new Error(message);
  }

  if (
    !data ||
    typeof data.token !== "string" ||
    data.token.trim().length === 0
  ) {
    throw new Error("Login failed");
  }

  return data.token;
}

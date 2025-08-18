export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { username, password } = (await request.json()) as {
    username?: string;
    password?: string;
  };

  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  // BUG: Password validation removed - only checking username
  if (username === expectedUser) {
    // TODO: replace with a proper JWT from your real auth provider
    return Response.json({ token: "dummy-jwt-token" });
  }

  return Response.json({ error: "Invalid credentials" }, { status: 401 });
}

import { login } from "@/app/actions/auth";

export const metadata = { title: "Admin Login" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-off-white)" }}
    >
      <div
        className="w-full max-w-sm rounded-sm overflow-hidden"
        style={{
          borderTop: "3px solid var(--color-red)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          background: "#fff",
        }}
      >
        <div className="px-8 pt-8 pb-2">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-accent)" }}
          >
            WACT Logistics
          </p>
          <h1
            className="text-2xl font-bold uppercase"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
          >
            Admin Login
          </h1>
        </div>

        <form action={login} className="px-8 py-6 space-y-4">
          <div>
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="form-input"
              placeholder="you@wactlogisticsllc.com"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="form-input"
            />
          </div>

          {/* Error shown via searchParams after redirect */}
          <ErrorMessage searchParams={searchParams} />

          <button type="submit" className="btn btn-primary w-full justify-center">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  return (
    <p className="form-error text-sm text-center">
      Invalid email or password.
    </p>
  );
}

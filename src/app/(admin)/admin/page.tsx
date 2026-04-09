import { createClient } from "@/utils/supabase/server";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalCount },
    { count: newCount },
    { count: confirmedCount },
    { data: recent },
  ] = await Promise.all([
    supabase.from("quote_requests").select("*", { count: "exact", head: true }),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "confirmed"),
    supabase
      .from("quote_requests")
      .select("id, name, material, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Total Orders", value: totalCount ?? 0, color: "var(--color-blue)" },
    { label: "New", value: newCount ?? 0, color: "var(--color-red)" },
    { label: "Confirmed", value: confirmedCount ?? 0, color: "#2a7a3b" },
  ];

  return (
    <div className="p-8">
      <h1
        className="text-2xl font-bold uppercase mb-6"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
      >
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-sm p-6"
            style={{ background: "#fff", borderTop: `3px solid ${color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-accent)" }}
            >
              {label}
            </p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)", color }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div
        className="rounded-sm overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--color-gray-light)" }}
        >
          <h2
            className="font-bold uppercase text-sm tracking-wider"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
          >
            Recent Orders
          </h2>
          <a
            href="/admin/orders"
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--color-red)", fontFamily: "var(--font-accent)" }}
          >
            View All →
          </a>
        </div>

        {!recent || recent.length === 0 ? (
          <p className="px-6 py-8 text-center" style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-body)" }}>
            No orders yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-gray-light)" }}>
                {["Customer", "Material", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-accent)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid var(--color-gray-light)" }}>
                  <td className="px-6 py-3" style={{ fontFamily: "var(--font-body)" }}>{row.name}</td>
                  <td className="px-6 py-3" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>{row.material}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-6 py-3" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    new:       { bg: "#FEF2F2", color: "var(--color-red)" },
    confirmed: { bg: "#F0FDF4", color: "#15803d" },
    completed: { bg: "#EFF6FF", color: "var(--color-blue)" },
    cancelled: { bg: "#F9FAFB", color: "var(--color-gray-mid)" },
  };
  const s = styles[status] ?? styles.new;
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-bold uppercase"
      style={{ background: s.bg, color: s.color, fontFamily: "var(--font-accent)", letterSpacing: "0.06em" }}
    >
      {status}
    </span>
  );
}

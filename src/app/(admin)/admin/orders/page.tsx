import { createClient } from "@/utils/supabase/server";
import { updateOrderStatus } from "@/app/actions/orders";

export const metadata = { title: "Orders" };

const STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLES: Record<Status, { bg: string; color: string }> = {
  new:       { bg: "#FEF2F2", color: "#BF0A30" },
  confirmed: { bg: "#F0FDF4", color: "#15803d" },
  completed: { bg: "#EFF6FF", color: "#0A1F6B" },
  cancelled: { bg: "#F9FAFB", color: "#9A9A90" },
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("quote_requests")
    .select("id, name, phone, material, quantity, unit, pickup_or_delivery, preferred_date, status, created_at, notes")
    .order("created_at", { ascending: false });

  if (filterStatus && STATUSES.includes(filterStatus as Status)) {
    query = query.eq("status", filterStatus);
  }

  const { data: orders } = await query;

  return (
    <div className="p-8">
      <h1
        className="text-2xl font-bold uppercase mb-6"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
      >
        Orders
      </h1>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <FilterTab href="/admin/orders" label="All" active={!filterStatus} />
        {STATUSES.map((s) => (
          <FilterTab
            key={s}
            href={`/admin/orders?status=${s}`}
            label={s}
            active={filterStatus === s}
          />
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-sm overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {!orders || orders.length === 0 ? (
          <p className="px-6 py-12 text-center" style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-body)" }}>
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-gray-light)" }}>
                  {["Customer", "Phone", "Material", "Qty", "Type", "Date", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-accent)", whiteSpace: "nowrap" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    style={{ borderBottom: "1px solid var(--color-gray-light)" }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
                      {order.name}
                    </td>
                    <td className="px-4 py-3" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)", whiteSpace: "nowrap" }}>
                      <a href={`tel:${order.phone}`} style={{ color: "var(--color-blue)" }}>{order.phone}</a>
                    </td>
                    <td className="px-4 py-3" style={{ fontFamily: "var(--font-body)" }}>{order.material}</td>
                    <td className="px-4 py-3" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)", whiteSpace: "nowrap" }}>
                      {order.quantity ? `${order.quantity} ${order.unit ?? ""}` : "—"}
                    </td>
                    <td className="px-4 py-3 capitalize" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>
                      {order.pickup_or_delivery ?? "—"}
                    </td>
                    <td className="px-4 py-3" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)", whiteSpace: "nowrap" }}>
                      {order.preferred_date
                        ? new Date(order.preferred_date).toLocaleDateString()
                        : new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status as Status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusActions id={order.id} current={order.status as Status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterTab({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      className="px-4 py-1.5 rounded-sm text-xs font-bold uppercase"
      style={{
        fontFamily: "var(--font-accent)",
        letterSpacing: "0.06em",
        background: active ? "var(--color-blue)" : "#fff",
        color: active ? "#fff" : "var(--color-gray-dark)",
        border: `1px solid ${active ? "var(--color-blue)" : "var(--color-gray-light)"}`,
      }}
    >
      {label}
    </a>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.new;
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-bold uppercase"
      style={{ background: s.bg, color: s.color, fontFamily: "var(--font-accent)", letterSpacing: "0.06em" }}
    >
      {status}
    </span>
  );
}

function StatusActions({ id, current }: { id: string; current: Status }) {
  const next: Partial<Record<Status, Status>> = {
    new:       "confirmed",
    confirmed: "completed",
  };
  const nextStatus = next[current];

  return (
    <div className="flex gap-1">
      {nextStatus && (
        <form action={updateOrderStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value={nextStatus} />
          <button
            type="submit"
            className="px-2 py-1 rounded text-xs font-bold uppercase"
            style={{
              fontFamily: "var(--font-accent)",
              background: "var(--color-blue)",
              color: "#fff",
              letterSpacing: "0.04em",
            }}
          >
            → {nextStatus}
          </button>
        </form>
      )}
      {current !== "cancelled" && current !== "completed" && (
        <form action={updateOrderStatus}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value="cancelled" />
          <button
            type="submit"
            className="px-2 py-1 rounded text-xs font-bold uppercase"
            style={{
              fontFamily: "var(--font-accent)",
              background: "#F9FAFB",
              color: "var(--color-gray-mid)",
              letterSpacing: "0.04em",
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

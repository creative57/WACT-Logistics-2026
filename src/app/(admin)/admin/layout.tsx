import { signOut } from "@/app/actions/auth";
import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-off-white)" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{ background: "var(--color-blue)", color: "#fff" }}
      >
        <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-accent)" }}
          >
            WACT Logistics
          </p>
          <p
            className="text-lg font-bold uppercase"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            Admin
          </p>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-6 py-2.5 text-sm font-semibold uppercase transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-accent)", letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-accent)", color: "rgba(255,255,255,0.5)" }}
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

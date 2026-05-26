import Link from "next/link";
import { navigationItems } from "@/data/mock-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,15,15,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--primary)]/14 text-lg font-semibold text-[color:var(--primary)]">
              R
            </span>
            <div>
              <p className="font-serif text-lg font-semibold tracking-wide text-[color:var(--text-primary)]">
                RentSafe
              </p>
              <p className="text-xs text-[color:var(--primary)]">賃居守護</p>
            </div>
          </Link>

          <Link href="/check" className="button-primary hidden sm:inline-flex">
            開始查核
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[color:var(--text-secondary)]">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[color:var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import { useMarket } from '../context/MarketContext.jsx';

const ROLES = [['buyer', 'Buyer'], ['seller', 'Seller'], ['admin', 'Admin']];

export default function Header() {
  const { role, setRole } = useMarket();
  return (
    <header className="bg-forest text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3.5">
        <div>
          <div className="font-display text-2xl font-bold leading-tight">Green Karachi</div>
          <div className="text-xs opacity-80">Wholesale plants, one place</div>
        </div>
        <nav role="tablist" aria-label="Switch role" className="flex gap-1.5 rounded-full bg-white/15 p-1">
          {ROLES.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={role === key}
              onClick={() => setRole(key)}
              className={`rounded-full px-4 py-2 text-[15px] font-semibold ${role === key ? 'bg-white text-forest' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

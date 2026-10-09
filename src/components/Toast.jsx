import { useMarket } from '../context/MarketContext.jsx';

export default function Toast() {
  const { toast } = useMarket();
  return (
    <div
      role="status"
      className={`pointer-events-none fixed bottom-5 left-1/2 max-w-[90%] -translate-x-1/2 rounded-lg bg-forest px-4 py-2.5 text-white transition-opacity ${toast ? 'opacity-100' : 'opacity-0'}`}
    >
      {toast}
    </div>
  );
}

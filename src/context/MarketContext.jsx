import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { INITIAL_SELLERS, INITIAL_STOCK } from '../services/mockData.js';
import { availableListings, buildPlan } from '../utils/allocate.js';

const Ctx = createContext(null);
export const useMarket = () => useContext(Ctx);

const NEXT = { pending: 'accepted', accepted: 'dispatched', dispatched: 'delivered' };

export function MarketProvider({ children }) {
  const [role, setRole] = useState('buyer');
  const [sellers, setSellers] = useState(INITIAL_SELLERS);
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sellerId, setSellerId] = useState(1);
  const [toast, setToast] = useState('');
  const ids = useRef({ order: 1, stock: 100, seller: 100 });
  const timer = useRef();

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2400);
  }, []);

  const sellerName = (id) => sellers.find((s) => s.id === id)?.name ?? 'Unknown';
  const planFor = (plant, qty) => buildPlan(availableListings(stock, sellers, plant), qty);

  const recordRequest = (plant, qty) =>
    setRequests((r) =>
      r.some((x) => x.plant === plant && x.qty === qty)
        ? r
        : [{ plant, qty, time: new Date().toLocaleTimeString() }, ...r]
    );

  const placeOrder = (plant, qty) => {
    const plan = planFor(plant, qty);
    if (!plan.length) return notify('No stock available');
    const parts = plan.map(({ listing, take }) => ({
      sellerId: listing.sellerId, qty: take, price: listing.price, status: 'pending',
    }));
    const taken = new Map(plan.map(({ listing, take }) => [listing.id, take]));
    setStock((s) => s.map((r) => (taken.has(r.id) ? { ...r, qty: r.qty - taken.get(r.id) } : r)));
    setOrders((o) => [
      { id: ids.current.order++, plant, requested: qty, qty: parts.reduce((a, p) => a + p.qty, 0), parts },
      ...o,
    ]);
    notify(`Order placed – ${parts.length} seller(s) notified`);
  };

  const advance = (orderId, index) => {
    setOrders((os) =>
      os.map((o) =>
        o.id !== orderId ? o : {
          ...o,
          parts: o.parts.map((p, i) => (i === index ? { ...p, status: NEXT[p.status] ?? p.status } : p)),
        }
      )
    );
    notify('Status updated');
  };

  const addStock = (plant, qty, price) => {
    setStock((s) => {
      const hit = s.find((r) => r.sellerId === sellerId && r.plant === plant);
      return hit
        ? s.map((r) => (r === hit ? { ...r, qty: r.qty + qty, price } : r))
        : [...s, { id: ids.current.stock++, sellerId, plant, qty, price }];
    });
    notify('Stock listed');
  };

  const applySeller = (name, area) => {
    setSellers((s) => [...s, { id: ids.current.seller++, name, area, status: 'pending' }]);
    notify('Application sent – waiting for admin approval');
  };

  const decide = (id, status) => {
    setSellers((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    notify(`Seller ${status}`);
  };

  return (
    <Ctx.Provider value={{
      role, setRole, sellers, stock, orders, requests, sellerId, setSellerId, toast,
      notify, sellerName, planFor, recordRequest, placeOrder, advance, addStock, applySeller, decide,
    }}>
      {children}
    </Ctx.Provider>
  );
}

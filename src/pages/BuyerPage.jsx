import { useState } from 'react';
import { useMarket } from '../context/MarketContext.jsx';
import { PLANTS } from '../services/mockData.js';
import { availableListings } from '../utils/allocate.js';
import { num, rs } from '../utils/format.js';
import Chip from '../components/Chip.jsx';
import Table from '../components/Table.jsx';

export default function BuyerPage() {
  const { stock, sellers, orders, sellerName, planFor, recordRequest, placeOrder, notify } = useMarket();
  const [plant, setPlant] = useState('Coconut');
  const [qty, setQty] = useState(10000);
  const [req, setReq] = useState(null);

  const check = () => {
    const q = parseInt(qty, 10);
    if (!(q > 0)) return notify('Enter a quantity greater than 0');
    setReq({ plant, qty: q });
    recordRequest(plant, q);
  };

  const plan = req ? planFor(req.plant, req.qty) : [];
  const total = plan.reduce((a, x) => a + x.take, 0);

  const order = () => {
    placeOrder(req.plant, req.qty);
    setReq(null);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="card">
          <h2 className="mb-3 text-xl">Post a bulk request</h2>
          <label className="label" htmlFor="plant">Plant</label>
          <select id="plant" value={plant} onChange={(e) => setPlant(e.target.value)}>
            {PLANTS.map((p) => <option key={p}>{p}</option>)}
          </select>
          <label className="label" htmlFor="qty">Quantity</label>
          <input id="qty" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
          <button className="btn" onClick={check}>Check availability</button>

          {req && (
            <div className={`mt-4 rounded-xl p-3.5 ${total < req.qty ? 'bg-amber-100' : 'bg-green-100'}`}>
              <b className="font-display text-2xl">{num(total)} out of {num(req.qty)}</b>{' '}
              available from {plan.length} seller{plan.length === 1 ? '' : 's'}
              <div className="my-2 h-2 overflow-hidden rounded bg-line">
                <div className="h-full bg-leaf" style={{ width: `${Math.round((total / req.qty) * 100)}%` }} />
              </div>
              {plan.length ? (
                <>
                  <Table>
                    <thead><tr><th>Seller</th><th>Area</th><th>Qty</th><th>Price/unit</th></tr></thead>
                    <tbody>
                      {plan.map(({ listing, take }) => (
                        <tr key={listing.id}>
                          <td>{sellerName(listing.sellerId)}</td>
                          <td>{sellers.find((s) => s.id === listing.sellerId)?.area}</td>
                          <td>{num(take)}</td><td>{rs(listing.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <button className="btn" onClick={order}>Order {num(total)} plants</button>
                </>
              ) : <p>No seller has this plant right now. Try another plant.</p>}
            </div>
          )}
        </section>

        <section className="card">
          <h2 className="mb-3 text-xl">Browse all stock</h2>
          <Table>
            <thead><tr><th>Plant</th><th>Available</th><th>Sellers</th></tr></thead>
            <tbody>
              {PLANTS.map((p) => {
                const a = availableListings(stock, sellers, p);
                return <tr key={p}><td>{p}</td><td>{num(a.reduce((s, r) => s + r.qty, 0))}</td><td>{a.length}</td></tr>;
              })}
            </tbody>
          </Table>
        </section>
      </div>

      <section className="card mt-4">
        <h2 className="mb-3 text-xl">My orders</h2>
        {!orders.length && <p className="text-mute">No orders yet. Post a request above and place your first order.</p>}
        {orders.map((o) => (
          <div key={o.id} className="border-t border-line py-3 first:border-t-0">
            <b>Order #{o.id} – {num(o.qty)} {o.plant}</b>{o.qty < o.requested && ` (requested ${num(o.requested)})`}
            <Table>
              <tbody>
                {o.parts.map((p, i) => (
                  <tr key={i}>
                    <td>{sellerName(p.sellerId)}</td>
                    <td>{num(p.qty)} × {rs(p.price)}</td>
                    <td><Chip status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </section>
    </>
  );
}

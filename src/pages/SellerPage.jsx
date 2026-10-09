import { useState } from 'react';
import { useMarket } from '../context/MarketContext.jsx';
import { PLANTS } from '../services/mockData.js';
import { num, rs } from '../utils/format.js';
import Chip from '../components/Chip.jsx';
import Table from '../components/Table.jsx';

const ACTION = { pending: 'Accept', accepted: 'Mark dispatched', dispatched: 'Mark delivered' };

export default function SellerPage() {
  const { sellers, sellerId, setSellerId, stock, orders, addStock, applySeller, advance, notify } = useMarket();
  const [plant, setPlant] = useState('Coconut');
  const [qty, setQty] = useState(1000);
  const [price, setPrice] = useState(200);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');

  const approved = sellers.filter((s) => s.status === 'approved');
  const mine = stock.filter((r) => r.sellerId === sellerId);
  const assigned = orders.flatMap((o) =>
    o.parts.map((p, i) => ({ order: o, part: p, index: i })).filter((x) => x.part.sellerId === sellerId)
  );

  const list = () => {
    const q = parseInt(qty, 10), p = parseInt(price, 10);
    if (!(q > 0) || !(p > 0)) return notify('Quantity and price must be above 0');
    addStock(plant, q, p);
  };
  const apply = () => {
    if (!name.trim() || !area.trim()) return notify('Enter nursery name and area');
    applySeller(name.trim(), area.trim());
    setName(''); setArea('');
  };

  return (
    <>
      <section className="card">
        <label className="label mt-0" htmlFor="seller">Signed in as</label>
        <select id="seller" value={sellerId} onChange={(e) => setSellerId(+e.target.value)}>
          {approved.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="card">
          <h2 className="mb-3 text-xl">List plant stock</h2>
          <label className="label" htmlFor="p">Plant</label>
          <select id="p" value={plant} onChange={(e) => setPlant(e.target.value)}>
            {PLANTS.map((x) => <option key={x}>{x}</option>)}
          </select>
          <label className="label" htmlFor="q">Quantity</label>
          <input id="q" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
          <label className="label" htmlFor="pr">Price per unit (Rs)</label>
          <input id="pr" type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button className="btn" onClick={list}>List stock</button>
        </section>

        <section className="card">
          <h2 className="mb-3 text-xl">Apply as a new seller</h2>
          <label className="label" htmlFor="n">Nursery name</label>
          <input id="n" placeholder="e.g. Korangi Plants" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="label" htmlFor="a">Area in Karachi</label>
          <input id="a" placeholder="e.g. Korangi" value={area} onChange={(e) => setArea(e.target.value)} />
          <button className="btn" onClick={apply}>Send application</button>
          <p className="mt-3 text-sm text-mute">New sellers can sell only after admin approval (see Admin tab).</p>
        </section>
      </div>

      <section className="card mt-4">
        <h2 className="mb-3 text-xl">My stock</h2>
        {mine.length ? (
          <Table>
            <thead><tr><th>Plant</th><th>Quantity</th><th>Price/unit</th></tr></thead>
            <tbody>{mine.map((r) => <tr key={r.id}><td>{r.plant}</td><td>{num(r.qty)}</td><td>{rs(r.price)}</td></tr>)}</tbody>
          </Table>
        ) : <p className="text-mute">No stock listed yet. Use the form above.</p>}
      </section>

      <section className="card mt-4">
        <h2 className="mb-3 text-xl">Assigned orders</h2>
        {!assigned.length && <p className="text-mute">No assigned orders yet. They appear here when a buyer orders your plants.</p>}
        {assigned.map(({ order, part, index }) => (
          <div key={`${order.id}-${index}`} className="flex flex-wrap items-center gap-2 border-t border-line py-3 first:border-t-0">
            <b>Order #{order.id}</b>
            <span>{num(part.qty)} {order.plant} at {rs(part.price)} = {rs(part.qty * part.price)}</span>
            <Chip status={part.status} />
            {ACTION[part.status] && (
              <button className="btn btn-sm" onClick={() => advance(order.id, index)}>{ACTION[part.status]}</button>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

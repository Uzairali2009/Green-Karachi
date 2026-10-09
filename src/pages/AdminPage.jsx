import { useMarket } from '../context/MarketContext.jsx';
import { num } from '../utils/format.js';
import Chip from '../components/Chip.jsx';
import Table from '../components/Table.jsx';

export default function AdminPage() {
  const { sellers, stock, orders, requests, sellerName, decide } = useMarket();
  const pending = sellers.filter((s) => s.status === 'pending');
  const stats = [
    [sellers.filter((s) => s.status === 'approved').length, 'Approved sellers'],
    [pending.length, 'Pending approval'],
    [requests.length, 'Buyer requests'],
    [orders.length, 'Orders'],
    [num(stock.reduce((a, r) => a + r.qty, 0)), 'Plants in stock'],
  ];

  return (
    <>
      <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
        {stats.map(([v, l]) => (
          <div key={l} className="card !p-3">
            <b className="block font-display text-2xl">{v}</b>
            <span className="text-sm text-mute">{l}</span>
          </div>
        ))}
      </div>

      <section className="card">
        <h2 className="mb-3 text-xl">Seller applications</h2>
        {pending.length ? (
          <Table>
            <thead><tr><th>Nursery</th><th>Area</th><th /></tr></thead>
            <tbody>
              {pending.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td><td>{s.area}</td>
                  <td className="space-x-2">
                    <button className="btn btn-sm" onClick={() => decide(s.id, 'approved')}>Approve</button>
                    <button className="btn btn-sm btn-ghost" onClick={() => decide(s.id, 'rejected')}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : <p className="text-mute">No pending applications.</p>}
      </section>

      <section className="card mt-4">
        <h2 className="mb-3 text-xl">All sellers</h2>
        <Table>
          <thead><tr><th>Nursery</th><th>Area</th><th>Status</th></tr></thead>
          <tbody>{sellers.map((s) => <tr key={s.id}><td>{s.name}</td><td>{s.area}</td><td><Chip status={s.status} /></td></tr>)}</tbody>
        </Table>
      </section>

      <section className="card mt-4">
        <h2 className="mb-3 text-xl">Requests and orders</h2>
        {requests.length ? (
          <Table>
            <thead><tr><th>Request</th><th>Time</th></tr></thead>
            <tbody>{requests.map((r, i) => <tr key={i}><td>{num(r.qty)} {r.plant}</td><td>{r.time}</td></tr>)}</tbody>
          </Table>
        ) : <p className="text-mute">No requests yet.</p>}
        {orders.map((o) => (
          <div key={o.id} className="border-t border-line py-3">
            <b>Order #{o.id} – {num(o.qty)} {o.plant}</b>
            <Table>
              <tbody>
                {o.parts.map((p, i) => (
                  <tr key={i}><td>{sellerName(p.sellerId)}</td><td>{num(p.qty)}</td><td><Chip status={p.status} /></td></tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </section>
    </>
  );
}

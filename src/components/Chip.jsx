const styles = {
  pending: 'bg-amber-100 text-amber-800',
  accepted: 'bg-sky-100 text-sky-800',
  dispatched: 'bg-sky-100 text-sky-800',
  delivered: 'bg-green-100 text-forest',
  approved: 'bg-green-100 text-forest',
  rejected: 'bg-red-100 text-red-700',
};

export default function Chip({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? ''}`}>
      {status}
    </span>
  );
}

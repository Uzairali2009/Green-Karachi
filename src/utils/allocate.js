// Stock from approved sellers only, largest listing first.
export function availableListings(stock, sellers, plant) {
  const approved = new Set(sellers.filter((s) => s.status === 'approved').map((s) => s.id));
  return stock
    .filter((r) => r.plant === plant && r.qty > 0 && approved.has(r.sellerId))
    .sort((a, b) => b.qty - a.qty);
}

// Splits `qty` across listings: [{ listing, take }]
export function buildPlan(listings, qty) {
  let left = qty;
  const plan = [];
  for (const listing of listings) {
    if (left <= 0) break;
    const take = Math.min(listing.qty, left);
    plan.push({ listing, take });
    left -= take;
  }
  return plan;
}

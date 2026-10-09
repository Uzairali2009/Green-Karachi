// Demo data. Phase 3: replace with calls to /api/v1/* (see context/MarketContext.jsx).
export const PLANTS = ['Coconut', 'Mango', 'Neem', 'Areca Palm', 'Bougainvillea', 'Ficus'];

export const INITIAL_SELLERS = [
  { id: 1, name: 'Gadap Green Nursery', area: 'Gadap', status: 'approved' },
  { id: 2, name: 'Malir Plant House', area: 'Malir', status: 'approved' },
  { id: 3, name: 'Clifton Nursery', area: 'Clifton', status: 'approved' },
  { id: 4, name: 'Hawksbay Growers', area: 'Hawksbay', status: 'approved' },
  { id: 5, name: 'Gulshan Garden Co.', area: 'Gulshan', status: 'pending' },
];

export const INITIAL_STOCK = [
  { id: 1, sellerId: 1, plant: 'Coconut', qty: 5000, price: 450 },
  { id: 2, sellerId: 2, plant: 'Coconut', qty: 3000, price: 430 },
  { id: 3, sellerId: 3, plant: 'Coconut', qty: 1500, price: 470 },
  { id: 4, sellerId: 4, plant: 'Coconut', qty: 479, price: 440 },
  { id: 5, sellerId: 1, plant: 'Neem', qty: 2500, price: 120 },
  { id: 6, sellerId: 2, plant: 'Neem', qty: 1200, price: 110 },
  { id: 7, sellerId: 3, plant: 'Mango', qty: 800, price: 380 },
  { id: 8, sellerId: 2, plant: 'Ficus', qty: 600, price: 210 },
];

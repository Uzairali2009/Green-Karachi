# Green Karachi – Client (React + Vite + Tailwind)

## Run
```bash
cd client
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
- `src/context/MarketContext.jsx` – all state and actions (demo, in-memory). Phase 3: swap these functions for API calls to `/api/v1/*`.
- `src/utils/allocate.js` – stock matching and order-splitting logic.
- `src/pages/` – BuyerPage, SellerPage, AdminPage.
- `src/components/` – Header, Chip, Table, Toast.

Note: role switching is a demo shortcut. Real role-based access (JWT) is enforced on the server in the backend phase.

import Header from './components/Header.jsx';
import Toast from './components/Toast.jsx';
import BuyerPage from './pages/BuyerPage.jsx';
import SellerPage from './pages/SellerPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { useMarket } from './context/MarketContext.jsx';

const PAGES = { buyer: BuyerPage, seller: SellerPage, admin: AdminPage };

export default function App() {
  const { role } = useMarket();
  const Page = PAGES[role];
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-5">
        <p className="mb-5 rounded-lg bg-beige px-3.5 py-2.5 text-sm text-mute">
          Demo mode: all three roles run in this one app. Data resets on refresh. The platform handles no money –
          price is recorded on the order only, payment is settled between buyer and seller.
        </p>
        <Page />
      </main>
      <Toast />
    </>
  );
}

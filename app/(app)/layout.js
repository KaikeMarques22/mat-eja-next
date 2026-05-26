import BottomNav from '../../components/BottomNav';
import { requireUser } from '../../lib/auth';

export default async function AppLayout({ children }) {
  await requireUser();

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-slate-100 pb-24">
      {children}
      <BottomNav />
    </div>
  );
}

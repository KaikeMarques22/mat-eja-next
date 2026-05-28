import AppNav from '../../components/AppNav';
import { requireUser } from '../../lib/auth';

export default async function AppLayout({ children }) {
  await requireUser();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem]">
        <AppNav variant="sidebar" />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <div className="app-content flex-1 pb-24 lg:pb-8">{children}</div>
          <AppNav variant="bottom" />
        </div>
      </div>
    </div>
  );
}

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { UserNav } from '@/components/dashboard/user-nav';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-bold">Mon Espace</h1>
          </div>
          <UserNav user={session.user} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenue {session.user.name}</CardTitle>
            <CardDescription>Votre espace personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Gérez vos projets et vos demandes depuis cet espace.</p>
            <Button asChild>
              <Link href="/dashboard/profile">Gérer mon profil</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes demandes</CardTitle>
            <CardDescription>Suivez l'avancement de vos demandes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Visualisez toutes vos demandes de devis et contacts en cours.</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/requests">Voir mes demandes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes projets</CardTitle>
            <CardDescription>Projets en cours et terminés</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Accédez à tous vos projets et leur statut actuel.</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/projects">Voir mes projets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

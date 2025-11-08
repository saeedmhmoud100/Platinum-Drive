import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import MainLayout from '@/components/layout/main-layout'
import FilesPageClient from './files-client'

export default async function FilesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  return (
    <MainLayout>
      <FilesPageClient userId={session.user.id} />
    </MainLayout>
  )
}

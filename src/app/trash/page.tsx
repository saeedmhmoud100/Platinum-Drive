import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import MainLayout from '@/components/layout/main-layout'
import TrashPageClient from './trash-client'

export default async function TrashPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  return (
    <MainLayout>
      <TrashPageClient userId={session.user.id} />
    </MainLayout>
  )
}

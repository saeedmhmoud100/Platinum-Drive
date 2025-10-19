import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import SharedLinksClient from './shared-client'
import MainLayout from '@/components/main-layout'

export default async function SharedLinksPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  return (
    <MainLayout>
      <SharedLinksClient userId={session.user.id} />
    </MainLayout>
  )
}

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MainLayout from '@/components/main-layout'
import SearchPageClient from './search-client'

export default async function SearchPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  return (
    <MainLayout>
      <SearchPageClient userId={session.user.id} />
    </MainLayout>
  )
}

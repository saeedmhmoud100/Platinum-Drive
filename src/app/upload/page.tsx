import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import MainLayout from '@/components/layout/main-layout'
import UploadPageClient from './upload-client'

export default async function UploadPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <MainLayout>
      <UploadPageClient />
    </MainLayout>
  )
}

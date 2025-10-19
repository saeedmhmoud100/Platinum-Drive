import { redirect } from 'next/navigation'
import ShareAccessClient from './share-client'

interface SharePageProps {
  params: Promise<{
    token: string
  }>
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params

  if (!token) {
    redirect('/')
  }

  return <ShareAccessClient token={token} />
}

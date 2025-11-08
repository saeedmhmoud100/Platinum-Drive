import { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import FavoritesClient from './favorites-client'

export const metadata: Metadata = {
  title: 'المفضلة - Platinum Drive',
  description: 'الملفات المفضلة'
}

export default function FavoritesPage() {
  return (
    <MainLayout>
      <FavoritesClient />
    </MainLayout>
  )
}

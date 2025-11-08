import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import {
  notifyStorageWarning,
  notifyStorageFull,
  notifyTrashAutoDeleteSoon,
  notifyShareAccessed,
  notifyNewLogin,
  notifyPasswordChanged,
  notifyAdminsNewUser,
  notifyAdminsSystemStorage,
} from '@/lib/services/notification'

/**
 * POST /api/notifications/test
 * Create test notifications for development
 */
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type } = body

    let result

    switch (type) {
      case 'storage_warning_80':
        result = await notifyStorageWarning(session.user.id, 80)
        break
      case 'storage_warning_90':
        result = await notifyStorageWarning(session.user.id, 90)
        break
      case 'storage_warning_95':
        result = await notifyStorageWarning(session.user.id, 95)
        break
      case 'storage_full':
        result = await notifyStorageFull(session.user.id)
        break
      case 'trash_delete_soon':
        result = await notifyTrashAutoDeleteSoon(session.user.id, 15, 3)
        break
      case 'share_accessed':
        result = await notifyShareAccessed(session.user.id, 'تقرير_المشروع.pdf', 'مستخدم غير معروف')
        break
      case 'new_login':
        result = await notifyNewLogin(session.user.id, 'Chrome على Windows', 'القاهرة، مصر')
        break
      case 'password_changed':
        result = await notifyPasswordChanged(session.user.id)
        break
      case 'admin_new_user':
        result = await notifyAdminsNewUser('newuser@example.com', 'مستخدم جديد')
        break
      case 'admin_system_storage':
        result = await notifyAdminsSystemStorage(85)
        break
      default:
        // Create all types at once
        await notifyStorageWarning(session.user.id, 90)
        await notifyTrashAutoDeleteSoon(session.user.id, 10, 2)
        await notifyShareAccessed(session.user.id, 'مستند_مهم.docx', 'زميل')
        await notifyNewLogin(session.user.id, 'Safari على iPhone', 'الإسكندرية')
        result = { message: 'Created multiple test notifications' }
    }

    return NextResponse.json({ 
      success: true,
      notification: result,
    })
  } catch (error) {
    console.error('Failed to create test notification:', error)
    return NextResponse.json(
      { error: 'فشل إنشاء الإشعار التجريبي' },
      { status: 500 }
    )
  }
}

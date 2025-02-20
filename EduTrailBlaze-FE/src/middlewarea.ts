import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token // Lấy token từ NextAuth
    console.log('token',token)
  },
  {
    pages: {
      signIn: '/auth/login_register'
    }
  }
)

export const config = {
  matcher: ['/admin_dashboard/:path*'] // Chỉ chặn các trang cần bảo vệ
}

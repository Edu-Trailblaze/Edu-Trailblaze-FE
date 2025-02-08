import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login_register',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|auth).*)']
}

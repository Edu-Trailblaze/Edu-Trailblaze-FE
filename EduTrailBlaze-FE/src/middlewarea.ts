import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login_register",
  },
});

export const config = {
  matcher: ["/admin_dashboard/:path*"], // Chỉ chặn các trang cần bảo vệ
};

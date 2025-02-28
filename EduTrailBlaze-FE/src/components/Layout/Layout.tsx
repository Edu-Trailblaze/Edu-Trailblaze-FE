import { useSession } from 'next-auth/react'
import SideMenu from '@/components/admin/SideMenu/SideMenu'
import scss from './Layout.module.scss'
import React from 'react'
import Footer from '../admin/Footer/footer'

const Layout = (props: any) => {
  const { data: session } = useSession()

  return (
    <>
      <main className={scss.layout}>
        {/* SideMenu */}
        {session && (
          <aside className={scss.sideMenu}>
            <SideMenu />
          </aside>
        )}

        {/* Nội dung (Dashboard) */}
        <section className={scss.content}>{props.children}</section>
      </main>
      <Footer />
    </>
  )
}

export default Layout

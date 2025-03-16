import { useSession } from 'next-auth/react'
import scss from './Layout.module.scss'
import React, { useState } from 'react'
import Footer from '../admin/Footer/footer'

import AdminHeader from '../admin/Header/header'
import SideMenu from '@/components/admin/SideMenu/sidemenu'

const Layout = (props: any) => {
  const { data: session } = useSession()
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <>
      <AdminHeader isCollapsed={isCollapsed} />
      <main className={scss.layout}>
        {/* SideMenu */}
        {session && (
          <aside className={scss.sideMenu}>
            <SideMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />{' '}
          </aside>
        )}

        {/* Nội dung (Dashboard) */}
        <section className={scss.content} style={{ marginLeft: isCollapsed ? -150 : 0 }}>
          {props.children}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Layout

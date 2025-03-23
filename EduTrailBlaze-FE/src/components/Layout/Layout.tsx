import { useSession } from 'next-auth/react'
import scss from './Layout.module.scss'
import React, { useState } from 'react'
import Footer from '../admin/Footer/footer'

import AdminHeader from '../admin/Header/header'
import SideMenu from '../../components/admin/SideMenu/sidemenu'

const Layout = (props: any) => {
  const { data: session } = useSession()
  return (
    <>
      <AdminHeader />
      <main className={scss.layout}>
        {/* SideMenu */}
        {session && (
          <aside className={scss.sideMenu}>
            <SideMenu />
          </aside>
        )}

        {/* Nội dung (Dashboard) */}
        <section className={scss.content}>
          {props.children}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Layout

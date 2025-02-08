import { useSession } from 'next-auth/react'
import SideMenu from '../admin/SideMenu/sideMenu'
import scss from './Layout.module.scss'
import React from 'react'
import Footer from '../admin/Footer/footer'

const Layout = (props: any) => {
  const { data: session } = useSession()

  return (
    <main className={scss.layout}>
      {session && <SideMenu />}
      {props.children}
      <Footer/>
    </main>
  )
}

export default Layout

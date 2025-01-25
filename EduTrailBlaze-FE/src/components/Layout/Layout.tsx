import { useSession } from 'next-auth/react'
import SideMenu from '../admin/SideMenu/sideMenu'
import scss from './Layout.module.scss'
import React from 'react'

const Layout = (props: any) => {
  const { data: session } = useSession()

  return (
    <main className={scss.layout}>
      {session && <SideMenu />}
      {props.children}
    </main>
  )
}

export default Layout

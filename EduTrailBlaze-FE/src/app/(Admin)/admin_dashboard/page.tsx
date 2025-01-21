import AdminHeader from '@/components/admin/Header/header'
import SideMenu from '@/components/admin/SideMenu/sidemenu'
import React from 'react'
import Dashboard from './Dashboard/page'
import scss from '../../Home.module.scss'

export default function AdminDashboard() {
  return (
    <main className={scss.main}>
      <AdminHeader/>
      <SideMenu/>
      <Dashboard/>
    </main>
  )
}

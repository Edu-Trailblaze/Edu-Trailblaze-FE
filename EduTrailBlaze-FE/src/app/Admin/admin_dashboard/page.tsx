import AdminHeader from '@/components/admin/Header/header'
import SideMenu from '@/components/admin/SideMenu/sidemenu'
import React from 'react'
import Dashboard from './Dashboard/page'

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader/>
      <SideMenu/>
      <Dashboard/>
    </div>
  )
}

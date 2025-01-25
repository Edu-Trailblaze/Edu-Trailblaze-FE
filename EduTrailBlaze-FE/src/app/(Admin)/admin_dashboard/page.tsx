'use client'
import React from 'react'
import Dashboard from './Dashboard/page'
import scss from '../../Home.module.scss'
import { useSession } from 'next-auth/react'

export default function AdminDashboard() {
  const { data: session } = useSession()
  return <main className={scss.main}>{session && <Dashboard />}</main>
}

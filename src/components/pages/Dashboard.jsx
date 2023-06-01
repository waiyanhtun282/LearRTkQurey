import React from 'react'
import Navbar from './Navbar'
import ContactTable from './ContactTable'

const Dashboard = () => {
  return (
    <div className="container px-8">
      <Navbar />
      <ContactTable />
      <p className="">
        dashboard
      </p>
    </div>
  )
}

export default Dashboard

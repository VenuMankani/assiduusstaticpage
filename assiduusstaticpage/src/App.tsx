import { useEffect, useRef, useState } from 'react'
import './App.css'
import CheckingAccount from './components/GraphData/CheckingAccount'
import Invoices from './components/GraphData/Invoices'
import TotalCashFlow from './components/GraphData/TotalCashFlow'
import Wishlist from './components/GraphData/Wishlist'
import Header from './components/Header/Header'
import SideBar from './components/Sidebar/SideBar'

function App() {

  return (
    <div className='App'>
      <Header />
      <SideBar />
      <div className="main-content">
        <div className="grid-container">
          <div className="grid-item">
            <CheckingAccount />
          </div>
          <div className="grid-item">
            <Invoices />
          </div>
          <div className="grid-item">
            <TotalCashFlow />
          </div>
          <div className="grid-item">
            <Wishlist />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

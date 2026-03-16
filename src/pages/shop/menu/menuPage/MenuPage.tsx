import React from 'react'
import Navbar from '../../../../shared/components/navbar/Navbar'
import "./menuPage.css"
import Menu from '../../../../features/shop/menu/Menu'

export default function MenuPage() {
  return (
    <div className="menuPage__container-global">
      <Navbar/>
      <div className="menuPage__container-content">
        <Menu />
      </div>
    </div>
  )
}

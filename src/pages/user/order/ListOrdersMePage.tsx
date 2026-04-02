import React from 'react'
import Navbar from '../../../shared/components/navbar/Navbar'
import Footer from '../../../shared/components/footer/Footer'
import PqrsListMe from '../../../features/user/pqrs/ui/pqrsListMe/PqrsListMe'
import ListOrderMe from '../../../features/user/order/ui/ListOrdersMe'

export default function ListOrdersMePage() {
  return (
    <div className="pqrsMePage__container-global">
      <Navbar />

      <div className="pqrsMePage__container-table">

        <ListOrderMe />
      </div>


      <Footer />
    </div>
  )
}

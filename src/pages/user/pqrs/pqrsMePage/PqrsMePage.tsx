import React from 'react'
import "./pqrsMePage.css"
import Navbar from '../../../../shared/components/navbar/Navbar'
import Footer from '../../../../shared/components/footer/Footer'
import PqrsListMe from '../../../../features/user/pqrs/ui/pqrsListMe/PqrsListMe'

export default function PqrsMePage() {
  return (
    <div className="pqrsMePage__container-global">
      <Navbar />

      <div className="pqrsMePage__container-table">

        <PqrsListMe />
      </div>


      <Footer />
    </div>
  )
}

import React from 'react'
import "./PqrsUpdateMePage.css"
import PqrsUpdateMe from '../../../../features/user/pqrs/ui/pqrsUpdateMe/PqrsUpdateMe'
import Navbar from '../../../../shared/components/navbar/Navbar'
import Footer from '../../../../shared/components/footer/Footer'

export default function PqrsUpdateMePage() {
  return (
    <div className="pqrsUpdateMePage__container-global">
      <Navbar />

      <div className="pqrsUpdateMePage__container-content">
        <PqrsUpdateMe />
      </div>

      <Footer />

    </div>
  )
}

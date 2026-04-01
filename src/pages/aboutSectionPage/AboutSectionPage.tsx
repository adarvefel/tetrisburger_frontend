import React from 'react'
import AboutSection from '../homePage/components/aboutSection/AboutSection'
import Navbar from '../../shared/components/navbar/Navbar'
import Footer from '../../shared/components/footer/Footer'
import "./aboutSectionPage.css"

export default function AboutSectionPage() {
  return (
    <div className="aboutSectionPage__container-global">
        <Navbar/>
        <div className="aboutSectionPage__container-content">
            <AboutSection/>
        </div>
        <Footer/>
    </div>
  )
}

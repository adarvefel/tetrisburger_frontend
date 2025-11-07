import React from 'react'
import "./home.css"
import Navbar from '../../shared/components/navbar/Navbar'
import HeroSection from './components/heroSection/HeroSection'
import GallerySection from './components/gallerySection/GallerytSection'
import OptionsSection from './components/optionsSection/OptionsSection'
import AboutSection from './components/aboutSection/AboutSection'
import ExtraGallerySection from './components/extraGallerySection/ExtraGallerySection'
import Footer from '../../shared/components/footer/Footer'

export default function Home() {
  return (
    <div className="home__container-global">
        <Navbar />
        <HeroSection/>
        <OptionsSection/>
        <GallerySection/>
        <AboutSection/>
        <ExtraGallerySection/>
        <Footer/>
    </div>
  )
}

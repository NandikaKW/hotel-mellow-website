import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Preloader from './components/layout/Preloader'
import HeroSlider from './components/home/HeroSlider'
import AboutUs from './components/home/AboutUs'
import InfoStats from './components/home/InfoStats'
import RoomsSection from './components/home/RoomsSection'
import GallerySection from './components/home/GallerySection'
import ServicesSection from './components/home/ServicesSection'
import BlogSection from './components/home/BlogSection'
import { useAnimations } from './hooks/useAnimations'
import './App.css'
import ContactSection from './components/home/Contact'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './components/home/Admin'

function App() {
    const [loading, setLoading] = useState(true)
    useAnimations()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <Preloader />
    }

    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSlider />
                            <AboutUs />
                            <InfoStats />
                            <RoomsSection />
                            <GallerySection />
                            <ServicesSection />
                            <BlogSection />
                            <ContactSection />
                        </>
                    } />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App
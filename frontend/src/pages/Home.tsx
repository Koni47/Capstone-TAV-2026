import React, { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import Footer from '../components/Footer'

export default function Home() {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}

import React from 'react'
import { Layout } from './pages/Layout'
import { Navbar } from './Components/Navbar'
import { Footer } from './Components/Footer'
import './App.css'
export default function App (){
  return(
    <div className='App'>
      <Navbar />
      <Layout />
      <Footer />
    </div>
  )
}
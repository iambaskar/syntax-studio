import React from 'react'
import { Layout } from './pages/Layout'
import { Navbar } from './Components/Navbar'
import './App.css'
export default function App (){
  return(
    <div className='App'>
      <Navbar />
      <Layout />
    </div>
  )
}
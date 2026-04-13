import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './Home'
import { ShowcaseLayout } from './ShowcaseLayout'
import { HooksLayout } from './HooksLayout'
// import { RecipesLayout } from './RecipesLayout'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/showcase/*' element={<ShowcaseLayout />} />
      <Route path='/hooks/*' element={<HooksLayout />} />
      {/* <Route path='/recipes/*' element={<RecipesLayout />} /> */}
      </Routes>
    </>
  )
}

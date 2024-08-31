import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Recipes } from './Recipes'
import { Snippets } from './Snippets'

export const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/snippets' element={<Snippets />} />
            </Routes>
        </>
    )
}

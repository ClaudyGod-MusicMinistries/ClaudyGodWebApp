
import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopBanner } from '../Topbanner'
import { NavBar } from '../Navbar'


import { Footer } from '../footer'



const Layout: React.FC = () => {
return(
    <div className="flex flex-col min-h-screen">
        <TopBanner />
        <NavBar />
        <main className='flex-grow'>
         <Outlet />
        </main>
        <Footer />
    </div>
)


}

export default Layout
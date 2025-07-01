
import { Outlet } from 'react-router-dom'
import { TopBanner } from '../Topbanner'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/footer'



const Layout: React.FC = () => {
return(
    <div className="flex flex-col min-h-screen">
        <TopBanner />
        <Navbar />
        <main className='flex-grow'>
         <Outlet />
        </main>
        <Footer />
    </div>
)


}

export default Layout
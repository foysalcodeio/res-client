import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Pages/Home/Home/Shared/Footer/Footer'
import Navbar from '../Pages/Home/Home/Shared/Navbar/Navbar'

const Main = () => {
  const location = useLocation();
  console.log(location);
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer />}
    </div>
  )
}

export default Main;

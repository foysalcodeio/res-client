import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Home/Shared/Footer/Footer";
import Navbar from "../Pages/Home/Home/Shared/Footer/Navbar";

const Main = () => {
    return (
        <div>
           <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer />
        </div>
    );
};

export default Main;
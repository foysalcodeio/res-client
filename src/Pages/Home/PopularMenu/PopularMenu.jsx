import { useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";

const PopularMenu = () => {
    const [menu, setMenu] = useState([])

    useEffect(()=> {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => setMenu(data))
    }, [])

    
    return (
        <section>
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Item"
            ></SectionTitle>
        </section>
    );
};

export default PopularMenu;
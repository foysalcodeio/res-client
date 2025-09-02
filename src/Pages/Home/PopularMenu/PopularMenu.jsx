
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../Home/Shared/Menu/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    
    // const [menu, setMenu] = useState([])

    // useEffect(()=> {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular')
    //         setMenu(popularItems)
    //     })
    // }, [])

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    
    return (
        <section>
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Item"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-4 md:mb-2">
                {
                     popular.map((item) => <MenuItem
                     key={item._id}
                     item={item}
                     ></MenuItem> )
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle subheading="check it out" heading="Featured Item">
            </SectionTitle>
            <div className="md:flex  bg-slate-500 bg-opacity-50 items-center justify-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can i go some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad rem, illo nostrum sapiente atque libero. Totam ut rerum repudiandae aspernatur cum. Consequuntur quae modi velit ea numquam officiis dolores corrupti.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
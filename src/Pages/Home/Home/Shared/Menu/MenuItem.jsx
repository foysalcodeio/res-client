const MenuItem = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className="flex space-x-4  rounded p-3">
            <img className="w-[100px]" 
                src={image} alt=""
                style={{ borderRadius: '0 200px 200px 200px' }}
                 />
            <div>
                <h2 className="uppercase text-xl font-bold">{name}</h2>
                <p className="text-slate-700 text-xl font-thin">{recipe}</p>
            </div>
            <p className="text-xl">${price}</p>
        </div>
    );
};

export default MenuItem;
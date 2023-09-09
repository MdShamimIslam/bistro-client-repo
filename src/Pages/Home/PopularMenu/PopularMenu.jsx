import MenuItem from '../../../Shared/MenuItem/MenuItem';
import SectionTitle from '../../../Components/SectionTitle';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItem = menu.filter(item => item.category ==='popular')

    return (
        <div className='my-20'>
           <SectionTitle heading={'FROM OUR MENU'} subHeading={'Check it out'}></SectionTitle>
           <div className='grid md:grid-cols-2 gap-10'>
           {
            popularItem.map(items =><MenuItem
            key={items._id}
            items={items}
            ></MenuItem> )
           } 
           </div>
           <div className='text-center'>
           <button className="btn btn-outline mt-10 border-0 border-b-4">View full menu</button>
           </div>
        </div>
    );
};

export default PopularMenu;
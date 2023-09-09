import React from 'react';


const MenuItem = ({items}) => {
    const {image,price,name,recipe} = items;
    return (
       <div>
         <div className='mt-12 '>
            
            <div className='flex space-x-5'>
            <img style={{borderRadius:'0px 200px 200px 200px'}} className='w-[100px]' src={image} alt="" />
            <div>
                
                <h3 className='text-xl uppercase'>{name}</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-orange-400 text-xl'>${price}</p>
           </div>
        </div>
       
       </div>
    );
};

export default MenuItem;
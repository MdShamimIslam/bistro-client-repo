import React from 'react';
import Card from '../../../Shared/Card/Card';

const OrderMap = ({items}) => {
    return (
        <div className='mb-12'>
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4'>
              {
                items.map(item => <Card
                key={item._id}
                item={item}
                ></Card>)
              }
            </div>
        </div>
    );
};

export default OrderMap;
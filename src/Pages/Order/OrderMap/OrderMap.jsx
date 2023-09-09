import React from 'react';
import Card from '../../../Shared/Card/Card';

const OrderMap = ({items}) => {
    return (
        <div>
             <div className='grid md:grid-cols-3 gap-8'>
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
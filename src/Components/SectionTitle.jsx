import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className='text-center mx-auto '>
            <p className='text-orange-500 text-xl'>-----{subHeading}-----</p>
            <h3 className='uppercase text-2xl border-b-2 border-t-2 py-2 mt-2'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;
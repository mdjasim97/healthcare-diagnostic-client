import React from 'react';

const SectionTitle = ({title, subTitle}) => {
    return (
        <div className='mx-auto text-center my-10 space-y-3'>
            <h2 className='text-4xl font-bold'>{title}</h2>
            <h2 className='text-2xl font-semibold'>{subTitle}</h2>
        </div>
    );
};

export default SectionTitle;
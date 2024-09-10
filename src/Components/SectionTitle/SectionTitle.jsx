import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <div className='mx-auto text-center my-10 space-y-3'>
            <h2 className='text-5xl font-bold'>{title}</h2>
        </div>
    );
};

export default SectionTitle;
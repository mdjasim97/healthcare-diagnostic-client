import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            <div className='flex min-h-screen flex-col justify-center items-center space-y-5'>
                <h2 className='text-7xl font-extrabold text-center'>Opps</h2>
                <p className='text-2xl'>404 not found. Something is wrong!</p>
            </div>
        </div>
    );
};

export default ErrorPage;
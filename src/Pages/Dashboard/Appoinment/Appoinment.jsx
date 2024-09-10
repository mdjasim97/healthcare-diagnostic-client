import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Appoinment = () => {
    const userInfo = useLoaderData()
    console.log(userInfo)
    return (
        <div>
            <h2>User Appoinment Event</h2>
        </div>
    );
};

export default Appoinment;
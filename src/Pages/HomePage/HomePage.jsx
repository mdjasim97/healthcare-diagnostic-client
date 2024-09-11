import React from 'react';
import Navbar from '../../Components/Navbar';
import Bannar from '../../Components/Banner/Bannar';
import FeatureTest from '../../Components/FeatureTest/FeatureTest';
import Promotions from '../../Components/Promotions/Promotions';

const HomePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Bannar/>
            <FeatureTest/>
            <Promotions/>
        </div>
    );
};

export default HomePage;
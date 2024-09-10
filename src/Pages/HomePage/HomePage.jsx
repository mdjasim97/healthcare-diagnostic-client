import React from 'react';
import Navbar from '../../Components/Navbar';
import Bannar from '../../Components/Banner/Bannar';
import FeatureTest from '../../Components/FeatureTest/FeatureTest';

const HomePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Bannar/>
            <FeatureTest/>
        </div>
    );
};

export default HomePage;
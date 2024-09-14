import React from 'react';
import Navbar from '../../Components/Navbar';
import Bannar from '../../Components/Banner/Bannar';
import FeatureTest from '../../Components/FeatureTest/FeatureTest';
import Promotions from '../../Components/Promotions/Promotions';
import Recommendation from '../../Components/Recommendation/Recommendation';
import Footer from '../../Components/Footer/Footer';

const HomePage = () => {
    return (
        <div>
            <Bannar/>
            <FeatureTest/>
            <Promotions/>
            <Recommendation/>
            <Footer/>
        </div>
    );
};

export default HomePage;
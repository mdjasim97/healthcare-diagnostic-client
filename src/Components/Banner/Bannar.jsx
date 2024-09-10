import React from 'react';

const Bannar = () => {

    return (
        <div>
            <div id="slide1" className="carousel-item w-full relative ">
                <img src="https://i.ibb.co.com/Kxm2L0D/medical-test-banner.jpg" className="w-full h-[550px]" />

                <div className='absolute w-full flex flex-col justify-center p-24 h-[550px] bg-gradient-to-r from-[#151515] rgba(21, 21, 21, 0.00)'>
                    <div className='space-y-7 absolute w-2/4 text-white'>
                        <h1 className='text-5xl font-bold'>Get 15% Off <br />Your First Diagnostic Test</h1>
                        <p className='text-lg'>Your trusted partner in health, offering comprehensive diagnostic tests, personalized recommendations, and expert care. Book tests online, view results, and explore health tips—all in one place for your convenience.</p>
                        <div>
                            <button className="btn bg-[#FF3811] text-lg text-white">View All Test</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bannar;
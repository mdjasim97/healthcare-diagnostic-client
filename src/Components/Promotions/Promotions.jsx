import React from 'react';
import SectionTitle from './../SectionTitle/SectionTitle';

const Promotions = () => {
    return (
        <div>

            <SectionTitle title="Special Offer"
            ></SectionTitle>
            <div className="p-6 py-12 bg-violet-600 text-gray-50">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <h2 className="text-center text-6xl tracking-tighter font-bold">Up to
                            <br className="sm:hidden" /> 50% Off
                        </h2>
                        <div className="space-x-2 text-center py-2 lg:py-0">
                            <span>Use code:</span>
                            <span className="font-bold text-lg">HEALTH_50</span>
                        </div>
                        <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-900 text-gray-50 border-gray-600">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promotions;
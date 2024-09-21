import React from 'react';
import SectionTitle from './../SectionTitle/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Promotions = () => {

    const axiosPublic = useAxiosPublic()

    const { data: getCoupon = [] } = useQuery({
        queryKey: ['getCoupon'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBannar')
            return res.data
        }
    })

    console.log(getCoupon)

    return (
        <div>

            <SectionTitle title="Special Offer"
                subTitle='enjoy your happy life'
            ></SectionTitle>
            {
                getCoupon.filter(coupon => coupon.isActive == 'true').map(item => (<div key={item._id}>
                    <div className="p-6 py-12 bg-orange-600 text-gray-50">
                        <div className="container mx-auto">
                            <div className="flex flex-col lg:flex-row items-center justify-between">
                                <h2 className="text-center text-6xl tracking-tighter font-bold">Up to
                                    <br className="sm:hidden" /> {item.discount}% Off
                                </h2>
                                <div className="space-x-2 text-center text-2xl py-2 lg:py-0">
                                    <span>Use code:</span>
                                    <span className="font-bold">{item.couponCode}</span>
                                </div>
                                <Link to={`/services`} href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block hover:bg-orange-500 bg-orange-600 text-gray-50 border-white">Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>))
            }
        </div>
    );
};

export default Promotions;
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import FeatureCard from '../FeaturedCard/FeatureCard';

const FeatureTest = () => {

    const axiosPublic = useAxiosPublic()

    const { data: feature = [] } = useQuery({
        queryKey: ['feature'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allTest')
            return res.data
        }
    })

    return (
        <div>
            <SectionTitle
                title='Featured Test'
                subTitle="Most booked test by user"
            ></SectionTitle>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                {
                    feature.slice(0,6).map(item => <FeatureCard key={item._id} featureCard={item}>

                    </FeatureCard>)
                }
            </div>

        </div>
    );
};

export default FeatureTest;
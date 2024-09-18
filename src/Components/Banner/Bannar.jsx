import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Bannar = () => {

    const axiosPublic = useAxiosPublic()
    const [useBannar, setUseBannar] = useState([])
    const [num, setNum] = useState(0)

    console.log(num)



    const { refetch, data } = useQuery({
        queryKey: ['bannar'],
        queryFn: async () => {
            const res = await axiosPublic.get('bannarText')
            setUseBannar(res.data[num])
            return res.data[num]
        }
    })

    console.log(useBannar)

    // const openModal = (e) => {
    //     setNum(e.target.value)
    //     refetch()
    // }

    return (
        <div>


            <div className="carousel-item w-full relative ">
                <img src={useBannar?.image} className="w-full lg:h-[550px]" />

                <div className='absolute h-full w-full flex flex-col justify-center p-4 lg:p-24 lg:h-[550px] bg-gradient-to-r from-[#151515] rgba(21, 21, 21, 0.00)'>
                    <div className='lg:space-y-7 absolute lg:w-2/4 text-white'>
                        <h1 className='lg:text-5xl text-2xl font-bold '>Get {useBannar?.discount} off</h1>
                        <h2 className='lg:text-5xl text-2xl font-bold'>{useBannar?.title}</h2>
                        <p className='lg:text-xl'>{useBannar?.description}</p>
                        <div className='my-2'>
                            <Link to='services' className="btn bg-[#FF3811] text-lg text-white">View All Test</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Bannar;
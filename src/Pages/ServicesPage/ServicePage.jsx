
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import Cover from '../../Components/Cover/Cover';
import { useEffect, useState } from 'react';
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

const ServicePage = () => {


    // const axiosPublic = useAxiosPublic()
    const [allTest, setAllTest] = useState([])
    const [itemPerPage, setItemPerPage] = useState(6)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [inputDate, setInputDate] = useState()

    // console.log(inputDate)


    const numberOfPage = Math.ceil(count / itemPerPage)
    const pages = [...Array(numberOfPage).keys()].map(element => element + 1)


    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`https://healthcare-diagnostic-server.vercel.app/allTest?page=${currentPage}&size=${itemPerPage}`)
            setAllTest(data)
        }
        getData()
    }, [currentPage, itemPerPage])





    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios.get(`https://healthcare-diagnostic-server.vercel.app/all-item`)
            setCount(data.count)
        }
        getCount()
    }, [])



    const handleCurrentBtn = (value) => {
        console.log(value)
        setCurrentPage(value)
    }




    return (
        <div>

            <div>
                <Cover />
            </div>

            <SectionTitle title='Our Avilable Test'></SectionTitle>

            <div>
                <div className='lg:my-10'>
                    <form className="max-w-md mx-auto">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative m-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                            <div className='flex'>
                                <input type="date" onChange={(e) => setInputDate(e.currentTarget.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Here..." required />
                                <button type="submit" className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-2'>
                {
                    allTest?.map(card => <ServiceCard key={card._id}
                        card={card}>
                    </ServiceCard>)
                }
            </div>

            {/* pagination section  */}
            <div className='flex justify-center my-10'>
                <button
                    disabled={currentPage == 1}
                    onClick={() => handleCurrentBtn(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>


                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handleCurrentBtn(btnNum)}
                        key={btnNum}
                        className={` ${currentPage === btnNum && 'bg-blue-500 text-white'} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}>
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage == numberOfPage}
                    onClick={() => handleCurrentBtn(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ServicePage;
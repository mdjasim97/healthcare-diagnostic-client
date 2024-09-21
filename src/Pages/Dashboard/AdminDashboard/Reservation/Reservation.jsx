
import { Link } from 'react-router-dom';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReportSubmitModal from '../../../../Components/Modal/ReportSubmitModal';
import Swal from 'sweetalert2';

const Reservation = () => {

    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [reserveData, setReserveData] = useState('')
    console.log(searchText)

    const closeModal = () => {
        setIsOpen(false)
    }

    const { refetch, data: reserve = [] } = useQuery({
        queryKey: ['reserve'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reservation');
            return res.data
        }
    })

    console.log(reserve)

    // test reservation delete 
    const deleteReservation = (id) => {
        console.log(`delete id : ${id}`)
        Swal.fire({
            title: "Are you sure?",
            text: "You can not change next time!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteReservation/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }



    // submit test result
    const handleTestResult = (reserveInfo) => {
        setIsOpen(true)
        setReserveData(reserveInfo)
    }

    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h3 className="text-3xl">My Reservation </h3>
            </div>


            {/* Data search by user email  */}
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
                                <input type="search" onChange={(e) => setSearchText(e.currentTarget.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Here..." required />
                                <button type="submit" className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* =============================================================================
            ================================================================================= */}

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className='bg-gray-200'>
                            <tr>
                                <th>SL</th>
                                <th>Test</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Delete</th>
                                <th>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reserve.map((test, index) => <tr key={test._id}>

                                    <th>{index + 1}</th>
                                    <td>{test?.name}</td>
                                    <td>{test?.user.name}</td>
                                    <td>{test?.user.email}</td>
                                    <td className={
                                        `${test.status === 'pending' && 'text-yellow-400 '}
                                        ${test.status === 'success' && 'text-green-500'}
                                        ${test.status === 'none' && 'text-red-500'}`
                                    }>{test?.status ? test.status : 'none'}</td>

                                    <td><button onClick={() => deleteReservation(test._id)} className='btn btn-ghost bg-red-200 text-red-600'>Delete</button></td>
                                    <td><button onClick={()=>handleTestResult(test)} className='btn btn-ghost bg-green-200 text-green-600'>Submit</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <ReportSubmitModal isOpen={isOpen} closeModal={closeModal} refetch={refetch} reservationInfo={reserveData} />
        </div>
    );
};

export default Reservation;
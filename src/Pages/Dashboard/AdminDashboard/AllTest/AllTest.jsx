import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import { MdGroups } from "react-icons/md";


const AllTest = () => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { refetch, data: test = [] } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allTest');
            return res.data
        }
    })



    return (
        <div>

            <div className='flex justify-evenly my-4'>
                <h3 className="text-3xl">All Test</h3>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>See Details</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                test.map((test, index) => <tr key={test._id}>
                                    
                                    <th>{index + 1}</th>
                                    <td>{test?.name}</td>
                                    <td>{test?.price}</td>
                                    <td>{test?.status ? test.status : 'none'}</td>
                                    <td><button className='btn btn-ghost'>Details</button></td>
                                    <td>

                                        <td><button className='btn btn-ghost'>Update</button></td>
                                    </td>
                                    <td><button className='btn btn-ghost'>Delete</button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllTest;
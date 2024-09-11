import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from "react-icons/fa";
import { MdGroups } from 'react-icons/md';
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const [status, setStaus] = useState('')

    const handleStatus = (e) => {
        setStaus(e.target.value)
    }

    console.log(status)


    // const userStatusControl = (user) => {
    //     axiosSecure.patch(`/users/admin/${user._id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             if (res.data.modifiedCount > 0) {
    //                 refetch()
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${user?.name} is ${user?.status} Now`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // }

    return (
        <div>

            <div className='flex justify-evenly my-4'>
                <h3 className="text-3xl">All Users</h3>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Status</th>
                                <th>Check Info</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{
                                        user.role === 'admin' ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className='btn btn-ghost bg-orange-600'><MdGroups className='text-white text-2xl' /></button>
                                    }</td>
                                    <td>
                                        <select onChange={handleStatus} className="select"> {user.status}
                                            <option value='active'>Active</option>
                                            <option value='block'>Block</option>
                                        </select>
                                    </td>
                                    <td><button className='btn btn-ghost'>See Info</button></td>
                                    <td><button className='btn btn-ghost'>Download</button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;
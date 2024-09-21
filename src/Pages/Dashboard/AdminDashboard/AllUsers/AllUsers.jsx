import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { jsPDF } from "jspdf";
import useAuth from "../../../../hooks/useAuth";
import { FaFileDownload } from "react-icons/fa";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const doc = new jsPDF();


    const { user } = useAuth()
    const [userRole, setuserRole] = useState('')
    const [status, setStatus] = useState('')
    const [allUser, setAllUser] = useState([])


    // use for find all users 
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data
        }
    })

    // user for specific user booking services 
    const { data: booked = [], } = useQuery({
        queryKey: ['booked'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myApponment/${user.email}`);
            return res.data
        }
    })

    console.log(booked)



    // make admin by only admin 
    const userRoleUpdate = (e) => {
        // console.log(e.target.value)
        setuserRole(e.target.value)
    }

    // const handleMakeAdmin = async (users) => {
    //     document.getElementById('make_admin_modal').showModal()
    //     const email = users?.email
    //     console.log(email)
    //     try {
    //         const updateRole = {
    //             role: userRole
    //         }

    //         await axiosSecure.put(`/users/role/${email}`, updateRole)
    //             .then(result => {
    //                 refetch()
    //                 console.log(result)
    //             })

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const handleRoleModal = (user) => {
        document.getElementById('make_admin_modal').showModal()
        setAllUser(user)
    }


    const userRoleChange = async () => {
        const email = allUser?.email

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

                try {
                    const updateUser = {
                        email: email,
                        role: userRole,
                    }

                    axiosSecure.put('/users/role', updateUser)
                        .then(res => {
                            refetch()
                            console.log(res.data)
                        })
                } catch (error) {
                    console.log(error)
                }

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }



    const handleModal = (user) => {
        document.getElementById('my_modal_3').showModal()
        setAllUser(user)
    }

    const userStatus = (e) => {
        setStatus(e.target.value)
    }

    const userStatusUpdate = async () => {
        const email = allUser?.email
        // console.log(email)
        try {
            const updateUser = {
                email: email,
                status: status
            }

            console.log(updateUser)

            await axiosSecure.put('/userInfo', updateUser)
                .then(res => {
                    refetch()
                    console.log(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }


    // see user infor funtions 
    const seeUserInfoDetails = async (users) => {
        document.getElementById('see_User_Details_Modal').showModal()
        const email = users?.email
        // console.log(email)

        const res = await axiosSecure.get(`/users/${email}`)
        // console.log(res.data)
        setAllUser(res.data)

    }



    // ==============================================================================
    // ========================= download user details ==============================



    const downloadUserDetails = () => {
        const doc = new jsPDF()

        users.forEach((userData, index) => {
            doc.text(`Name : ${userData.name}`, 10, 10 + index * 10)
            doc.text(`email : ${userData.email}`, 10, 15 + index * 10)


            // List all bookings
            // booked.forEach((book))
        });

        doc.save("webpage-data.pdf");
    }

    return (
        <div>

            <div className='flex bg-orange-400 justify-evenly p-4'>
                <h3 className="text-3xl">All Users</h3>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className="bg-orange-300 text-white">
                                <th>SL</th>
                                <th>Picture</th>
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
                                users.map((users, index) => <tr key={users._id}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <div className="mask mask-squircle h-12 w-12">
                                            <FaUser className="text-2xl h-full" />
                                        </div>
                                    </th>
                                    <td>{users?.name}</td>
                                    <td>{users?.email}</td>
                                    <td>{
                                        users.role === 'admin' ? <button className="btn">Admin</button> : <button className={`btn ${users.role === 'user' && 'text-blue-500'}`} onClick={() => handleRoleModal(users)} >{users?.role}</button>
                                    }</td>
                                    <td>
                                        {users.role === 'admin' ? <button className="btn">Admin</button> : <button className={`btn`} onClick={() => handleModal(users)}>{users?.status}</button>}
                                    </td>
                                    <td><button onClick={() => seeUserInfoDetails(users)} className='btn'>See Info</button></td>
                                    <td><button onClick={() => downloadUserDetails(users)} className='btn btn-ghost'><FaFileDownload className="text-orange-400" size={34}/></button></td>
                                </tr>)
                            }


                        </tbody>


                        {/* make admin modal  */}
                        <dialog id="make_admin_modal" className="modal">
                            <div className="modal-box w-2/3">
                                <select onChange={userRoleUpdate} className="select w-full max-w-xs">
                                    <option default selected disabled >Change role</option>
                                    <option value='admin'>Admin</option>
                                </select>

                                <div className="modal-action justify-between">
                                    <form method="dialog">
                                        <button onClick={userRoleChange} className="btn btn-sm bg-green-400">Change</button>
                                    </form>

                                    <form method="dialog">
                                        <button className="btn btn-sm bg-red-400">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        {/* make admin Modal  */}

                        {/* status modal  */}
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box w-2/12">

                                <select onChange={userStatus} className="select w-full max-w-xs">
                                    <option default selected disabled >Change Status</option>
                                    <option defaultValue='active' value='active'>Active</option>
                                    <option value='blocked'>Block</option>
                                </select>

                                <div className="modal-action justify-between">
                                    <form method="dialog">
                                        <button onClick={userStatusUpdate} className="btn btn-sm bg-green-400">Change</button>
                                    </form>

                                    <form method="dialog">
                                        <button className="btn btn-sm bg-red-400">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        {/* statis modal  */}

                        {/* See User Details Modal  */}
                        <dialog id="see_User_Details_Modal" className="modal">
                            <div className="modal-box w-2/3">
                                <div>
                                    <h2 className="text-2xl font-semibold text-center">{allUser.name} Details</h2>
                                    <hr className="h-1 bg-gray-400 my-2" />
                                    <div className="flex justify-between">
                                        <div className="space-y-3">
                                            <h3>Name : {allUser.name}</h3>
                                            <h3>Blood Group : {allUser.blood}</h3>
                                            <p>Status : {allUser.status}</p>
                                        </div>

                                        <div className="space-y-3">
                                            <p>Email : {allUser.email}</p>
                                            <h3>Upzila : {allUser.upazila}</h3>
                                            <p>Distric : {allUser.disctric}</p>
                                        </div>
                                    </div>
                                    <div className="modal-action justify-center">
                                        <form method="dialog">
                                            <button className="btn bg-orange-400 text-white w-64">Close</button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </dialog>
                        {/* See User Details Modal  */}

                    </table >
                </div >
            </div >

        </div >
    );
};

export default AllUsers;
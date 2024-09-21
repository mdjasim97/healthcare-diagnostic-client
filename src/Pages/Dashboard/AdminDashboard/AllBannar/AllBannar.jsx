import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";


const AllBannar = () => {

    const axiosSecure = useAxiosSecure()
    const [bannarDetails, setBannarDetails] = useState('')
    const [selectBannar, setSelectBannar] = useState(false)

    const { refetch, data: bannar = [] } = useQuery({
        queryKey: ['bannar'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allBannar');
            return res.data
        }
    })

    // console.log(bannar)


    // ====================== Select bannar Modal =========================
    // 01. modal open 
    const bannarModal = (item) => {
        document.getElementById('select_Bannar_Modal').showModal()
        setBannarDetails(item)
    }

    // 02. changing value received 
    const handleSelectBannar = (e) => {
        setSelectBannar(e.target.value)
        console.log(e.target.value)
    }

    // 03. find update file and update data
    const handleSelectBannarActive = () => {

        console.log(bannarDetails)
        try {
            const activeBannar = {
                isActive: selectBannar
            }

            console.log(activeBannar)
            console.log(bannarDetails._id)

            axiosSecure.put(`/activeBannar/${bannarDetails._id}`, activeBannar)
                .then(res => {
                    refetch()
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Chage Bannar image",
                            text: `{${bannarDetails.name} Change Image}`,
                            icon: "success"
                        });
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }




    const handleDeleteBannar = (id) => {
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
                axiosSecure.delete(`/deleteBannar/${id}`)
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



            return (
                <div>
                    <div className='flex justify-evenly py-4 bg-orange-400'>
                        <h3 className="text-3xl">All Bannar</h3>
                    </div>

                    <div>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead className="bg-orange-300 text-center">
                                    <tr>
                                        <th>SL</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Discount</th>
                                        <th>Status</th>
                                        <th>Coupon</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        bannar.map((item, index) => <tr key={item._id}>

                                            <th>{index + 1}</th>
                                            <th><img src={item.image} alt="" className="w-12" /></th>
                                            <td>{item?.name}</td>
                                            <td>{item?.discount} %</td>
                                            <td><button onClick={() => bannarModal(item)} className="btn">{`${item.isActive}`}</button></td>
                                            <td>{item?.couponCode} %</td>
                                            <td><button onClick={() => handleDeleteBannar(item._id)} className='btn btn-ghost'><MdDelete size={24} /></button></td>
                                        </tr>)
                                    }
                                </tbody>
                                <div>
                                    {/* Active select bannar Modal */}
                                    <dialog id="select_Bannar_Modal" className="modal">
                                        <div className="modal-box w-2/12">

                                            <select onChange={handleSelectBannar} className="select w-full max-w-xs">
                                                <option default selected disabled >Select Bannar</option>
                                                <option value='false'>False</option>
                                                <option value='true'>True</option>
                                            </select>

                                            <div className="modal-action justify-between">
                                                <form method="dialog">
                                                    <button onClick={() => handleSelectBannarActive()} className="btn btn-sm bg-green-400">Change</button>
                                                </form>

                                                <form method="dialog">
                                                    <button className="btn btn-sm bg-red-400">Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                    {/* Active select bannar modal  */}
                                </div>
                            </table>
                        </div>
                    </div>

                </div>
            );
        };

        export default AllBannar;
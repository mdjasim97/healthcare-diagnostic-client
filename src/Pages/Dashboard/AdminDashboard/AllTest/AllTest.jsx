import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AllTest = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { refetch, data: test = [] } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allTest');
            return res.data
        }
    })


    const handleDeleteTest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteTest/${id}`)
                    .then(res => {
                        console.log(res.data)

                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Cancel Successfull!",
                                text: "Your file has been cancel.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }



    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h3 className="text-3xl">All Test</h3>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="bg-gray-200">
                            <tr>
                                <th>SL</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                test.map((test, index) => <tr key={test._id}>

                                    <th>{index + 1}</th>
                                    <th><img src={test?.image} alt="" className="w-16" /></th>
                                    <td>{test?.name}</td>
                                    <td>{test?.price}</td>


                                    <td>
                                        <td><Link to={`/updateTest/${test._id}`} className='btn bg-blue-200 text-blue-600 btn-ghost'>Update</Link></td>
                                    </td>
                                    <td><button onClick={() => handleDeleteTest(test._id)} className='btn bg-red-200 text-red-600 btn-ghost'>Delete</button></td>
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
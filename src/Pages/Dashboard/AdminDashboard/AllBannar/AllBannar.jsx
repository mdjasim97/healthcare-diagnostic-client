import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const AllBannar = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const {data: bannar = [] } = useQuery({
        queryKey: ['bannar'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBannar');
            return res.data
        }
    })

    console.log(bannar)


    const handleDeleteTest = (id) => {
        axiosSecure.delete(`/deleteTest/${id}`)
    }



    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h3 className="text-3xl">All Bannar</h3>
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
                        {/* <tbody>
                            {
                                test.map((test, index) => <tr key={test._id}>

                                    <th>{index + 1}</th>
                                    <td>{test?.name}</td>
                                    <td>{test?.price}</td>
                                    <td className={
                                        `${test.status === 'pending' && 'text-yellow-400 '}
                                        ${test.status === 'success' && 'text-green-500'}
                                        ${test.status === 'none' && 'text-red-500'}`
                                    }>{test?.status ? test.status : 'none'}</td>
                                    <td><button className='btn btn-ghost'>Details</button></td>
                                    <td>

                                        <td><Link to={`/updateTest/${test._id}`} className='btn btn-ghost'>Update</Link></td>
                                    </td>
                                    <td><button onClick={() => handleDeleteTest(test._id)} className='btn btn-ghost'>Delete</button></td>
                                </tr>)
                            }
                        </tbody> */}
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllBannar;
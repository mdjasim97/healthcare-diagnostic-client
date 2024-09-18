
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const UserAppoinment = ({ appoinmentCard, refetch }) => {
    console.log(appoinmentCard)
    const { name, details, image, price, date, meet_time, _id } = appoinmentCard



    const axiosSecure = useAxiosSecure()

    const handleAppoinmentCancel = (id) => {

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
                axiosSecure.delete(`/cancel/${id}`)
                    .then(data => {
                        console.log(data.data)
                        if (data.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Cancel Successfull!",
                                text: "Your file has been cancel.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }

    return (
        <div className='lg:m-10'>
            <div className="card m-2 lg:flex lg:flex-row items-center border-2 p-2 card-compact bg-base-100 shadow-xl">
                <div >
                    <figure className=''>
                        <img src={image} alt="Shoes" className='h-[200px]' />
                    </figure>
                </div>

                <div>
                    <div className='flex justify-between p-2 lg:p-4'>
                        <p><span className='font-bold'>Date : </span> {new Date(date).toLocaleDateString()}</p>
                        <p> <span className='font-bold'>Status : </span> Pending</p>
                        <p> <span className='font-bold'>Time : </span> {meet_time ? meet_time : '10:30 AM'}</p>
                    </div>

                    <div className="px-4 space-y-2">
                        <p className="card-title font-medium text-2xl">{name}</p>
                        <p>{details.length > 200 ? details.slice(0, 200) + "..." : details}</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='text-2xl'> <span className='text-2xl font-medium px-4'>Price :</span> ${price}</p>
                        <button onClick={() => handleAppoinmentCancel(_id)} className="text-2xl btn bg-orange-300 text-orange-600">Cancel</button>
                        <Link to={`/services/${_id}`} className='btn bg-orange-500 m-4 text-white text-2xl'>View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAppoinment;
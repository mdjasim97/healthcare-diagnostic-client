import { useLoaderData } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ServicesDetails = () => {

    const loadData = useLoaderData()
    // console.log(loadData)
    const { image, name, details, price, slots, date } = loadData
    const { user } = useAuth()
    const cuponCODE = 'HEALTH_50'
    const discountParcent = 50

    const [cuponText, setCuponText] = useState('');
    const [discountPrice, setDiscountPrice] = useState(0);
    const [pay, setPay] = useState(price);
    const [userInfo, setUserInfo] = useState('');
    const axiosSecure = useAxiosSecure()
    // console.log(discountPrice, pay)

    const { data: userData = [] } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })

    console.log(userInfo)




    const cuponApply = () => {
        console.log("Your Cope code is : ", cuponText)
        if (cuponCODE === cuponText) {
            const discountPrice = (price * discountParcent) / 100
            const paybleBalance = price - discountPrice
            setDiscountPrice(discountPrice)
            setPay(paybleBalance)
        } else {
            console.log('Copun code is expaire')
        }
    }



    const addToBookService = (data) => {
        const { name, price, details, image, date, } = data
        console.log(data)
        const serviceCart = {
            name: name,
            price: price,
            details: details,
            image: image,
            date: date,
            user_name: user?.displayName,
            user_email: user?.email,
            service_Status: 'pending'
        }

        console.log(serviceCart)
        // console.log('Service Price :', price)
    }


    const cuponRest = () => {
        setPay(price)
        setDiscountPrice(0)
        cuponText('')
        return
    }


    const handleBookPopup = (serviceData) => {
        document.getElementById('my_modal_2').showModal()
        addToBookService(serviceData)
    }


    return (
        <div className='mx-2'>
            <h1 className='text-center text-3xl lg:text-5xl font-bold my-5'>Test Details</h1>
            <hr className='h-1 bg-gray-400' />
            <div className="grid grid-cols-1 lg:grid-cols-2 my-5 lg:my-10 gap-10">

                <div className='border-2 p-2 rounded-2xl'>
                    <img src={image} alt="Album" className='rounded-2xl w-full h-full' />
                </div>
                <div className="border-2 rounded-2xl p-5">
                    <h2 className="text-3xl font-bold my-3 py-3 bg-orange-500 text-center text-white">Test Information</h2>
                    <div className='lg:space-y-3 flex flex-col justify-center'>
                        <h2 className='text-2xl font-bold'>Test : {name}</h2>
                        <p> <span className='font-bold'>Description :</span> {details}</p>

                        {/* <hr className='my-5 h-1' /> */}
                        {


                        }

                        <hr className='my-5 h-1 hidden lg:flex' />

                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            <p> <span className='font-bold'>Price :</span> {price}</p>
                            <p> <span className='font-bold'>Slots :</span> {slots}</p>
                        </div>

                        <hr className='my-5 h-1 hidden lg:flex' />

                        <div className='grid lg:grid-cols-2'>
                            <p> <span className='font-bold'>Date </span> {new Date().toLocaleDateString()}</p>
                            <p> <span className='font-bold'>Deadline </span> {new Date(date).toLocaleDateString()}</p>
                        </div>

                        <hr className='my-5 h-1' />

                        {
                            <button onClick={() => handleBookPopup(loadData)} type="button" className="text-white text-2xl p-2 bg-orange-500 hover:bg-orange-700 rounded-lg mx-10">Book Now</button>
                        }
                    </div>
                </div>
            </div>
            <p className='text-justify'>A Healthcare Diagnostic Center is a specialized facility dedicated to providing comprehensive medical diagnostic services to patients. These centers play a critical role in the early detection, prevention, and treatment of diseases by offering a wide array of diagnostic tests, including blood tests, imaging services (such as X-rays, MRIs, and CT scans), and specialized screenings like mammograms or cardiovascular exams. Equipped with advanced medical technology and staffed by trained healthcare professionals, these centers ensure accurate and timely results, aiding physicians in making informed decisions about patient care. Healthcare Diagnostic Centers often offer services on an outpatient basis, allowing patients to access diagnostic tests without the need for hospital admission, thereby increasing convenience and reducing healthcare costs. In addition to diagnostics, many centers also offer preventive health check-ups, enabling individuals to monitor their health and detect potential issues before they become serious. By providing high-quality diagnostic services, Healthcare Diagnostic Centers contribute significantly to improving patient outcomes, enhancing the efficiency of healthcare systems, and supporting the overall well-being of the community.</p>

            {/* modal start  */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-2/6">
                    <h3 className="font-bold text-2xl text-center my-5">Book Appoinment </h3>
                    <div className='space-y-3'>
                        <div className='flex justify-between items-center text-xl'>
                            <h1>{name}</h1>
                            <p>${price}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <input type="text" name='cuponText' placeholder="Type here"
                                className="input input-bordered flex-1"
                                onChange={(e) => setCuponText(e.target.value)} />
                            <button onClick={cuponApply} type='submit' className='btn '>Apply Cupon</button>
                        </div>

                        <div className='flex justify-between items-center text-xl'>
                            <p>Discount Price : </p>
                            <p>${discountPrice}</p>
                        </div>
                        <div className='flex justify-between items-center text-xl'>
                            <p>Payble balance : </p>
                            <p>${pay}</p>
                        </div>
                    </div>


                    <div className="modal-action justify-between">
                        <form method="dialog">
                            <button className="btn bg-green-600 text-white">Continue</button>
                        </form>

                        <form method="dialog">
                            <button onClick={cuponRest} className="btn bg-red-600 text-white">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* modal end  */}
        </div>
    );
};

export default ServicesDetails;
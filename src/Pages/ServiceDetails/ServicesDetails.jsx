import { useLoaderData } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import BookingModal from '../../Components/Modal/BookingModal';


const ServicesDetails = () => {

    const loadData = useLoaderData()
    // console.log(loadData)
    const { image, name, details, price, slots, date, meet_time } = loadData
    const cuponCODE = 'HEALTH_50'
    const discountParcent = 50


    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
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

                        <hr className='my-5 h-1 hidden lg:flex' />

                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            <p> <span className='font-bold'>Price :</span> {price}</p>
                            <p> <span className='font-bold'>Slots :</span> {slots}</p>
                        </div>

                        <hr className='my-5 h-1 hidden lg:flex' />

                        <div className='grid lg:grid-cols-2'>
                            <p> <span className='font-bold'>Date </span> {new Date().toLocaleDateString()}</p>
                            <p> <span className='font-bold'>Time </span> {meet_time? meet_time : '10:30 AM'}</p>
                        </div>

                        <hr className='my-5 h-1' />
                        <button onClick={()=>setIsOpen(true)} className='btn bg-orange-500 text-white mx-20'>Book Now</button>
                    </div>
                    <BookingModal isOpen={isOpen} closeModal={closeModal} testInfo={loadData}/>
                </div>
            </div>
            <p className='text-justify'>A Healthcare Diagnostic Center is a specialized facility dedicated to providing comprehensive medical diagnostic services to patients. These centers play a critical role in the early detection, prevention, and treatment of diseases by offering a wide array of diagnostic tests, including blood tests, imaging services (such as X-rays, MRIs, and CT scans), and specialized screenings like mammograms or cardiovascular exams. Equipped with advanced medical technology and staffed by trained healthcare professionals, these centers ensure accurate and timely results, aiding physicians in making informed decisions about patient care. Healthcare Diagnostic Centers often offer services on an outpatient basis, allowing patients to access diagnostic tests without the need for hospital admission, thereby increasing convenience and reducing healthcare costs. In addition to diagnostics, many centers also offer preventive health check-ups, enabling individuals to monitor their health and detect potential issues before they become serious. By providing high-quality diagnostic services, Healthcare Diagnostic Centers contribute significantly to improving patient outcomes, enhancing the efficiency of healthcare systems, and supporting the overall well-being of the community.</p>
        </div >
    );
};

export default ServicesDetails;
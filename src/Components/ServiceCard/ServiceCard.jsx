import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ card }) => {
    const { name, details, image, price, slots, date, _id } = card
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure className='relative'>
                    <img src={image} alt="Shoes" className='h-[200px] w-full' />
                    <h1 className="text-2xl lg:text-3xl bg-orange-600 p-2 text-white font-bold absolute bottom-2 left-2">
                        Price : ${price}
                    </h1>
                </figure>
                <div className='flex justify-between p-4'>
                    <h1 className='font-bold text-xl'>{new Date(date).toLocaleDateString()}</h1>
                    <h1 className='font-bold text-xl px-2 text-white bg-orange-600 rounded-lg'>Slots : {slots}</h1>
                </div>
                <div className="px-4 space-y-3">
                    <h2 className="card-title font-bold text-2xl">{name.length > 20 ? name.slice(0, 20) + "..." : name}</h2>
                    <p>{details.length > 90 ? details.slice(0, 90) + "..." : details}</p>
                </div>

                <Link to={_id} className='btn bg-orange-500 m-4 text-white text-2xl'>View Details</Link>
            </div>
        </div>
    );
};

export default ServiceCard;
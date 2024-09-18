
import { Link } from 'react-router-dom';

const FeatureCard = ({ featureCard }) => {
    const { name, details, image, price, slots, date, _id } = featureCard
    return (
        <div>
            <div className="card m-2 lg:flex lg:flex-row card-compact bg-base-100 shadow-xl">
                <div>
                    <figure className=''>
                        <img src={image} alt="Shoes" className='h-[200px]' />
                    </figure>
                </div>

                <div className=''>
                    <div className='flex justify-between p-2 lg:p-4'>
                        <h1 className='font-bold text-xl'>{date}</h1>
                        <h1 className='font-bold text-xl px-2 text-white bg-orange-600 rounded-lg'>Slots : {slots}</h1>
                    </div>
                    <div className="px-4 space-y-3">
                        <h2 className="card-title font-bold text-2xl">{name.length > 25 ? name.slice(0, 25) + "..." : name}</h2>
                        <p>{details.length > 90 ? details.slice(0, 90) + "..." : details}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="px-4 text-2xl font-bold">Price : ${price}</p>
                        <Link to={`services/${_id}`} className='btn bg-orange-500 m-4 text-white text-2xl'>View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;

import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../Pages/Dashboard/Checkout/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';




const BookingModal = ({ closeModal, isOpen, testInfo }) => {
    const stripePromise = loadStripe(import.meta.env.VITE_STREP_PUBLISH_KEY)
    const { name, price } = (testInfo)
    const { user } = useAuth()

    const [discount, setDiscount] = useState(0)
    const [payable, setPayable] = useState(price)
    const [couponText, setCouponText] = useState('')
    const [coupon, setCoupon] = useState()
    const [discounRate, setDiscountRate] = useState()


    const axiosPublic = useAxiosPublic()

    const { data: getOffer = [] } = useQuery({
        queryKey: ['getOffer'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBannar')
            return res.data
        }
    })

    console.log(getOffer)


    useEffect(() => {
        const activeOffer = getOffer.filter(item => item.isActive === 'true')
        if (activeOffer.length > 0) {
            const firstOffer = activeOffer[0];
            setCoupon(firstOffer.couponCode);
            setDiscountRate(firstOffer.discount);
        }
    }, [getOffer])



    // console.log(coupon, discounRate)


    const applyCoupon = () => {
        if (couponText == coupon) {
            const discountPrice = (price * parseFloat(discounRate)) / 100
            const payable = price - discountPrice

            setDiscount(discountPrice)
            setPayable(payable)
        } else {
            toast.error('Invalid coupon code..')
            console.log('Invaid Coupon code')
        }



    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>


                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Review Info Before Payment
                                </DialogTitle>

                                <hr className='my-2' />
                                <div className='mt-2'>
                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm text-gray-500'>Test : {name}</p>
                                        <p className='text-sm text-gray-500'>Price : {price}</p>
                                    </div>

                                    <hr className='my-2' />

                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm text-gray-500'>Patient : {user?.displayName}</p>
                                        <p className='text-sm text-gray-500'>Email : {user?.email}</p>
                                    </div>

                                    <hr className='my-2' />
                                    <div className='mt-2 flex justify-between'>
                                        <input onChange={(e) => setCouponText(e.target.value)} type="text" name='couponInput' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                        <button onClick={applyCoupon} className=' btn text-gray-500'>Appy coupon</button>
                                    </div>

                                    <hr className='my-2' />

                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm text-gray-500'>Discount Price</p>
                                        <p className='text-sm text-gray-500'>{discount}</p>
                                    </div>

                                    <hr className='my-2' />

                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm text-gray-500'>Payable Price</p>
                                        <p className='text-sm text-gray-500'>{payable}</p>
                                    </div>






                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            paymentAmount={payable}
                                            closeModal={closeModal}
                                            bookingInfo={
                                                {
                                                    ...testInfo,
                                                    price: payable,
                                                    user: {
                                                        name: user?.displayName,
                                                        email: user?.email
                                                    }
                                                }
                                            }
                                        />
                                    </Elements>
                                </div>
                                <hr className='mt-8 ' />


                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BookingModal
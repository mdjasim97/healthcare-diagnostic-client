

import { useEffect, useState } from 'react';
import '../../../assets/style/cardStyle.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';

const CheckoutForm = ({ closeModal, paymentAmount, bookingInfo }) => {
    // console.log(paymentAmount)
    // console.log(bookingInfo)

    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState("");
    const [processing, setProcessing] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    // Option=1

    // useEffect(() => {
    //     axiosSecure.post('/create-payment-intent', { price: paymentAmount })
    //         .then(res => {
    //             console.log(res.data.clientSecret)
    //             setClientSecret(res.data.clientSecret)
    //         })
    // }, [])

    // Option=2
    useEffect(() => {
        if (paymentAmount > 1 && paymentAmount) {
            getClientSecret(paymentAmount)
        }
    }, [])


    const getClientSecret = async (price) => {
        const { data } = await axiosSecure.post('/create-payment-intent', { price: price })
        console.log(data.clientSecret)
        setClientSecret(data.clientSecret)
    }

    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);


        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment Method Error', error);
            setCardError(error)
            return
        } else {
            console.log('PaymentMethod Method :', paymentMethod);
            setCardError('')
        }


        // confirm card payment 
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'annonymous',
                    name: user?.displayName || 'annonymous'
                }
            }
        })

        if (confirmError) {
            console.log(confirmError)
            setCardError(confirmError)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {

            // 1. Create payment info object
            const paymentInfo = {
                ...bookingInfo,
                transaction_id: paymentIntent.id,
                serviceId: bookingInfo._id,
                date: new Date()
            }
            delete paymentInfo._id
            // console.log(paymentInfo)

            try {
                // 2. save payment info in booking collection (db)
                const { data } = await axiosSecure.post('/booking', paymentInfo)
                console.log(data)

                // 3. change slots status to booked in db


            } catch (error) {
                console.log(error)
            }

            console.log(paymentInfo)
        }

        setProcessing(false)
        closeModal()
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex justify-between'>
                    <button type="submit" disabled={!stripe || !clientSecret || processing} className='btn bg-green-200 text-green-700'>
                        {
                            processing ? <ImSpinner9 className='animate-spin m-auto' size={24} />
                                : `payment ${paymentAmount}`
                        }
                    </button>



                    <button onClick={() => closeModal()} type="submit" disabled={!stripe} className='btn bg-red-200 text-red-700'>
                        Cancel
                    </button>
                </div>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
        </>
    );
};



export default CheckoutForm;
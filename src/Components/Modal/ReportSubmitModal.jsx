
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'





const ReportSubmitModal = ({ closeModal, isOpen, reservationInfo, refetch}) => {

    console.log(reservationInfo)

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()

    // const axiosPublic = useAxiosPublic()

    // const { data: getOffer = [] } = useQuery({
    //     queryKey: ['getOffer'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/allBannar')
    //         return res.data
    //     }
    // })

    // console.log(getOffer)


    // useEffect(() => {
    //     const activeOffer = getOffer.filter(item => item.isActive === 'true')
    //     if (activeOffer.length > 0) {
    //         const firstOffer = activeOffer[0];
    //         setCoupon(firstOffer.couponCode);
    //         setDiscountRate(firstOffer.discount);
    //     }
    // }, [getOffer])



    // console.log(coupon, discounRate)

    const SubmitTestResult = (e) => {
        e.preventDefault()
        const form = e.target
        const resultLink = form.reportLink.value;

        const resultDoc = {
            result: resultLink,
            ...reservationInfo
        }

        axiosSecure.patch(`/resultSubmit/${reservationInfo._id}`, resultDoc)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    closeModal()
                }
            })

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
                                    Submit Test Report
                                </DialogTitle>


                                <div className='mt-2'>

                                    <hr className='my-2' />

                                    <div className='mt-2 flex justify-between'>
                                        <p className='text-sm text-gray-500'>Patient : {user?.displayName}</p>
                                        <p className='text-sm text-gray-500'>Email : {user?.email}</p>
                                    </div>

                                    <hr className='my-2' />

                                    <form onSubmit={SubmitTestResult}>
                                        <textarea type="text" name='reportLink' placeholder="Submit report doc/link" className="input input-bordered w-full" />
                                        <hr className='my-2' />

                                        <div className='flex justify-between'>
                                            <button className='btn bg-orange-400'>Submit</button>

                                        </div>
                                    </form>




                                </div>



                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ReportSubmitModal
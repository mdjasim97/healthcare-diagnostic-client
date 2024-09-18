

import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"

const AddBannar = () => {

    const axiosSecure = useAxiosSecure()

    const handleBannarContent = async (e) => {
        e.preventDefault()
        const form = e.target
        const discount = form.discount.value
        const offerTitle = form.offerTitle.value
        const description = form.description.value
        const image = form.image.files[0]
        const couponCode = form.coupon.value;


        const bannarContent = { discount, offerTitle, description, image, couponCode }
        console.log(bannarContent)

        const formData = new FormData()
        formData.append('image', image)

        try {
            // 1. Upload image and get url
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
            console.log(data.data.display_url)


            // 4. user data store in database
            const bannarText = {
                discount: discount,
                title: offerTitle,
                description: description,
                image: data.data.display_url,
                couponCode: couponCode
            }

            //  console.log(bannarText)
            await axiosSecure.post('/addBannar', bannarText)
                .then(res => {
                    console.log(res.data)
                })

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Data has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <SectionTitle
                title="Bannar Content"
            ></SectionTitle>


            <div className="m-8 bg-gray-200 p-10 rounded-lg">
                <form onSubmit={handleBannarContent}>

                    <div className="flex gap-6">
                        {/* offer discount rate  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Discount %</span>
                            </label>
                            <input type="number" placeholder="Type discount rate.." name="discount" required className="input input-bordered w-full" />
                        </div>

                        {/* offer title  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Offer Title</span>
                            </label>
                            <input type="text" placeholder="New year, birthday, etc... " name="offerTitle" required className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* bannar text or descriptions  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Text</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Bannar discriptions or promotions text ..."></textarea>
                    </div>

                    <div className="flex gap-6">
                        {/* input bg image  */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Background Image</span>
                            </label>
                            <input type="file" name="image" className="file-input w-full max-w-xs" />
                        </div>

                        {/* Coupon code  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Coupon CODE</span>
                            </label>
                            <input type="text" placeholder="Type coupon code.. " name="coupon" required className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="my-5 flex justify-center">
                        <button className="btn btn-ghost lg:w-64 bg-orange-500 lg:text-2xl text-white">Continue & Add</button>
                    </div>
                </form>
            </div>

        </div>
    );
};
export default AddBannar;
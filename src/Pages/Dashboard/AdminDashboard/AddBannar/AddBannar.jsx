

import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"
import useAuth from "../../../../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";

const AddBannar = () => {

    const axiosSecure = useAxiosSecure()
    const {loading} = useAuth()

    const handleAddBannar = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const title = form.title.value;
        const description = form.description.value
        const image = form.image.files[0]
        const couponCode = form.coupon.value;
        const discount = form.discount.value



        const bannarContent = { name, title, description, image, couponCode, discount }
        console.log(bannarContent)

        const formData = new FormData()
        formData.append('image', image)

        try {
            // 1. Upload image and get url
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
            console.log(data.data.display_url)


            // 2. user data store in database
            const bannarInfo = {
                name: name,
                title: title,
                description: description,
                couponCode: couponCode,
                discount: discount,
                isActive : false,
                image: data.data.display_url
            }

            //  console.log(bannarText)
            await axiosSecure.post('/addBannar', bannarInfo)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Data has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <SectionTitle
                title="Add Bannar"
            ></SectionTitle>


            <div className="m-8 bg-gray-200 p-10 rounded-lg">
                <form onSubmit={handleAddBannar}>

                    <div className="flex gap-6">
                        {/* offer discount rate  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Type Bannar name..." name="name" required className="input input-bordered w-full" />
                        </div>

                        {/* offer title  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" placeholder="Bannar title ..." name="title" required className="input input-bordered w-full" />
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

                        {/* Coupon discount rate  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Coupon Discount Rate</span>
                            </label>
                            <input type="number" placeholder="Type discount %.. " name="discount" required className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="my-5 flex justify-center">
                        <button disabled={loading} className="btn btn-ghost lg:w-64 bg-orange-500 lg:text-2xl text-white">{
                            loading? <FaSpinner className="animate-spin mx-auto"/> : 'Add Bannar'
                            }</button>
                    </div>
                </form>
            </div>

        </div>
    );
};
export default AddBannar;
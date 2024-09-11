
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import axios from "axios";

const AddTest = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const handleAddTest = async (e) => {
        e.preventDefault()
        const form = e.target
        const test_name = form.name.value
        const test_desc = form.details.value
        const price = form.price.value
        const date = form.date.value
        const image = form.image.files[0]


        const addtest = { test_name, test_desc, price, date, image }
        console.log(addtest)

        const formData = new FormData()
        formData.append('image', image)

        try {
            // 1. Upload image and get url
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
            console.log(data.data.display_url)



            // 4. user data store in database
            const testData = {
                name: test_name,
                email: test_desc,
                price: price,
                image: data.data.display_url,
                date: date
            }

            console.log(testData)


            await axiosPublic.post('/addTest', testData)
                .then(res => {
                    console.log(res.data)
                })

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Data has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error.message)
        }

    }

        return (
            <div>
                <SectionTitle
                    title="Add New Test"
                ></SectionTitle>


                <div className="m-8 bg-gray-200 p-10 rounded-lg">
                    <form onSubmit={handleAddTest}>

                        <div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Test Name*</span>
                                </label>
                                <input type="text" placeholder="name" name="name" required className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* recipe details */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Test Details</span>
                            </label>
                            <textarea name="details" className="textarea textarea-bordered h-24" placeholder="Recepi details"></textarea>
                        </div>

                        <div className="flex gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input type="date" name="date" id="" />
                            </div>


                            {/* price  */}

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="form-control w-full my-6">
                            <input type="file" name="image" className="file-input w-full max-w-xs" />
                        </div>

                        <button className="btn btn-ghost bg-slate-400 text-white">Continue</button>
                    </form>
                </div>

            </div>
        );
    };
export default AddTest;
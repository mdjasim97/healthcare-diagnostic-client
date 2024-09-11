
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import axios from "axios";

const AddBannar = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const handleAddTest = async (e) => {
        e.preventDefault()
        const form = e.target
        const offer = form.offer.value
        const offerTitle = form.offerTitle.value
        const description = form.description.value
        const image = form.image.files[0]


        const bannarContent = { offer, offerTitle, description, image }
        console.log(bannarContent)

        const formData = new FormData()
        formData.append('image', image)

        try {
            // 1. Upload image and get url
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
            console.log(data.data.display_url)



            // 4. user data store in database
            const bannarText = {
                offer: offer,
                title: offerTitle,
                description: description,
                image: data.data.display_url,
            }

            console.log(bannarText)


            await axiosPublic.post('/addBannar', testData)
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
                title="Bannar Content Control"
            ></SectionTitle>


            <div className="m-8 bg-gray-200 p-10 rounded-lg">
                <form onSubmit={handleAddTest}>

                    <div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Offer</span>
                            </label>
                            <input type="text" placeholder="name" name="offer" required className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Offer Title</span>
                            </label>
                            <input type="text" placeholder="name" name="offerTitle" required className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Recepi details"></textarea>
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
export default AddBannar;
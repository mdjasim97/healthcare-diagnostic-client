

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const AddTest = () => {

    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date())
    const [value, onChange] = useState('10:30');

    const handleAddTest = async (e) => {
        e.preventDefault()
        const form = e.target
        const test_name = form.name.value
        const test_desc = form.details.value
        const price = form.price.value
        const date = startDate
        const image = form.image.files[0]
        const slots = form.slots.value;


        // const addtest = { test_name, test_desc, price, date, image, slots }
        //  console.log(addtest)

        const formData = new FormData()
        formData.append('image', image)

        try {
            // 1. Upload image and get url
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
            // console.log(data.data.display_url)
            // 4. user data store in database
            const testData = {
                name: test_name,
                details: test_desc,
                price: price,
                image: data.data.display_url,
                date: date,
                slots: slots,
                meet_time: value,
                status: 'pending',
                book_Count : 0
            }

            // console.log(testData)


            await axiosSecure.post('/addTest', testData)
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
            console.log(error)
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
                            <DatePicker className="w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                            {/* <input type="date" name="date" id="" className="input input-bordered w-full" /> */}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <div>
                                <TimePicker className='h-10 text-xl mr-10 bg-white' name="time" onChange={onChange} value={value} />
                            </div>
                            {/* <input type="date" name="date" id="" className="input input-bordered w-full" /> */}
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

                    <div className="flex gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Upload Picture</span>
                            </label>
                            <input type="file" name="image" className="file-input w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Slots</span>
                            </label>
                            <input type="text" name="slots" className="file-input w-full" />
                        </div>
                    </div>

                    <div className="flex justify-center w-full my-6">
                        <button className="btn w-64 btn-ghost bg-slate-600 text-white">Continue</button>
                    </div>

                </form>
            </div>

        </div>
    );
};
export default AddTest;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import signUp from '../../assets/signup/wellcome.jpg'

const SignUp = () => {

    const [blood, setBlood] = useState(" ")
    const [distric, setDistric] = useState(" ")
    const [upazila, setUpazila] = useState(" ")


    const { userCreate, userProfileUpdate, loading } = useAuth()
    const navigate = useNavigate()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()


    const selectBlood = (e) => {
        console.log(e.target.value)
        setBlood(e.target.value)
    }
    const selectDistric = (e) => {
        console.log(e.target.value)
        setDistric(e.target.value)
    }
    const selectUpazila = (e) => {
        console.log(e.target.value)
        setUpazila(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const user_name = form.name.value
        const user_email = form.email.value
        const user_password = form.password.value
        const user_confirmPassword = form.confirmPassword.value
        const blood_group = blood
        const user_distric = distric
        const user_upazila = upazila
        const image = form.image.files[0]

        const formData = new FormData()
        formData.append('image', image)

        if (user_password === user_confirmPassword) {

            try {
                // 1. Upload image and get url
                const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
                console.log(data.data.display_url)


                // 2. User create 
                await userCreate(user_email, user_password)

                // 3. User profile update
                await userProfileUpdate(user_name, data.data.display_url)

                // 4. user data store in database
                const userInfoDoc = {
                    name: user_name,
                    email: user_email,
                    profile: user?.photoURL,
                    blood: blood_group,
                    disctric: user_distric,
                    upazila: user_upazila,
                    status: 'active',
                }

                console.log(userInfoDoc)


                await axiosPublic.put('/users', userInfoDoc)
                    .then(res => {
                        console.log(res.data)
                    })

                navigate('/')
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

        } else {
            setPassError('Password not match')
            Swal.fire({
                icon: "error",
                title: "Password not match!",
                text: "Please chek your password."
            });
        }
    }


    const previousPage = () => {
        navigate(-1)
    }



    return (
        <div>
            <div className="bg-base-200 my-10">
                <div className="flex flex-col md:flex-row-reverse gap-10 p-16">
                    <div className="flex flex-col w-1/2 items-center justify-center">
                        <img src={signUp} alt="" className='w-full' />
                    </div>

                    <div className="w-1/2">
                        <h1 className="text-5xl text-center font-bold">SignUp</h1>
                        <form onSubmit={handleSubmit} className="card-body">

                            {/* User name and Email related input  */}
                            <div className="flex gap-6">
                                {/* user name  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">User Name</span>
                                    </label>
                                    <input name="name" type="text" id='name' placeholder="Enter Your Name Here" className="input input-bordered" required />
                                </div>

                                {/* user email  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' id='email' placeholder="Enter Your Email Here.." className="input input-bordered" required />
                                </div>
                            </div>

                            {/* Profile image & Blood group input  */}
                            <div className="flex gap-6">

                                {/* Profile Image */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Profile picture</span>
                                    </label>
                                    <input type="file" name='image' id='image' accept='image/*' className="file-input w-full max-w-xs" />
                                </div>

                                {/* Blood group  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <select onChange={selectBlood}
                                        className="select select-bordered w-full">
                                        <option disabled selected value="default">Select blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>

                            {/* Distric and Upazila related input  */}
                            <div className="flex gap-6">
                                {/* Distric Select  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Distric</span>
                                    </label>
                                    <select onChange={selectDistric}
                                        className="select select-bordered w-full">
                                        <option selected disabled value="default">Select your distric</option>
                                        <option value="rajshahi">Rajshahi</option>
                                        <option value="chapainawabganj">Chapainawabganj</option>
                                        <option value="natore">Natore</option>
                                        <option value="naogaon">Naogaon</option>
                                        <option value="pabna">Pabna</option>
                                        <option value="sirajganj">Sirajganj</option>
                                        <option value="bogra">Bogra</option>
                                        <option value="joypurhat">Joypurhat</option>
                                    </select>
                                </div>

                                {/* Upozila Select  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Upazila</span>
                                    </label>
                                    <select onChange={selectUpazila}
                                        className="select select-bordered w-full">
                                        <option disabled selected value="default">Select Upazila</option>
                                        <option value="bagmara">Bagmara</option>
                                        <option value="durgapur">Durgapur</option>
                                        <option value="godagari">Godagari</option>
                                        <option value="mohanpur">Mohanpur</option>
                                        <option value="paba">Paba</option>
                                        <option value="puthia">Puthia</option>
                                        <option value="tanore">Tanore</option>
                                        <option value="boalia">Boalia</option>
                                        <option value="matihar">Matihar</option>
                                        <option value="sibganj">Sibganj</option>
                                        <option value="nachole">Nachole</option>
                                        <option value="gomastapur">Gomastapur</option>
                                        <option value="niamatpur">Niamatpur</option>
                                    </select>
                                </div>
                            </div>

                            {/* Password ralated input input  */}
                            <div className="flex gap-6 w-full">
                                {/* password  */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' id='password' placeholder="Enter Your Password.." className="input input-bordered" required />

                                </div>

                                {/* Confirm password  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" name='confirmPassword' id='confirmPassword' placeholder="Confirm Password.." className="input input-bordered" required />
                                </div>
                            </div>

                            <button className="btn bg-[#d1a054b3] my-6 text-xl text-white">SignUp</button>

                            <div className="form-control mt-6">
                                <div className='text-[#d1a054b3] text-center text-xl space-y-1 mt-1'>
                                    <p>have your account? <Link className='text-blue-600 font-bold ml-2' to="/login">Login</Link></p>
                                    <p className='text-black'>Or sign in with</p>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
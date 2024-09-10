import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import signUp from '../../assets/signup/wellcome.jpg'

const SignIn = () => {

    const { loading, userLogin } = useAuth()
    const navigate = useNavigate()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()




    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const user_email = form.email.value
        const user_password = form.password.value;

        await userLogin(user_email, user_password)
            .then(result => {
                console.log("User login successfull", result)
                if (result?.user) {
                    Swal.fire({
                        title: "Successfull",
                        text: "User login successfull.",
                        icon: "success",
                        showConfirmButton : false,
                        timer : 1500
                    });
                }
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const previousPage = () => {
        navigate(-1)
    }


    return (
        <div>
            <div className=" my-10">
                <div className="flex flex-col md:flex-row-reverse gap-10 p-16">
                    <div className="flex flex-col w-1/2 items-center justify-center">
                        <img src={signUp} alt="" className='w-full' />
                    </div>

                    <div className="w-1/2 bg-base-200">
                        <h1 className="text-5xl text-center font-bold">Sign In</h1>
                        <form onSubmit={handleSubmit} className="card-body">

                            {/* User name and Email related input  */}
                            <div className="">
                                {/* user email  */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' id='email' placeholder="Enter Your Email Here.." className="input input-bordered" required />
                                </div>

                                {/* password  */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' id='password' placeholder="Enter Your Password.." className="input input-bordered" required />

                                </div>
                            </div>

                            <button className="btn bg-[#d1a054b3] my-6 text-xl text-white">Sign In</button>

                            <div className="form-control mt-6">
                                <div className='text-[#d1a054b3] text-center text-xl space-y-1 mt-1'>
                                    <p>have your account? <Link className='text-blue-600 font-bold ml-2' to="/signup">Sign Up</Link></p>
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

export default SignIn;
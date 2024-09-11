import React from 'react';

const BannarContent = () => {
    return (
        <form className="card-body">

            {/* User name and Email related input  */}
            <div className="flex gap-6">
            
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
                    <input type="text" name='email' id='email' placeholder="Enter Your Email Here.." className="input input-bordered" required />
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


            </div>

            <button className="btn bg-[#d1a054b3] my-6 text-xl text-white">Continue</button>

        </form>
    );
};

export default BannarContent;
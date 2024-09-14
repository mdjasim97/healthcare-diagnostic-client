import { Parallax } from 'react-parallax';
import coverImg from './../../assets/signup/wellcome.jpg'

const Cover = ({ img, title }) => {
    return (


        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage="https://img.freepik.com/free-photo/hand-with-protective-gloves-holding-blood-samples-covid-test_23-2148958366.jpg?w=740&t=st=1726133110~exp=1726133710~hmac=f44edf6e8e75bc1ccf2d77645880ebc5a31e69118596e7484cc51a220e7c1986"
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[400px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">All TEST</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi.
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>


    );
};

export default Cover;
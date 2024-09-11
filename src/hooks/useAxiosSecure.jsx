import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const {logOut} = useAuth()

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token')
        // console.log('request stoped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    });


    axiosSecure.interceptors.response.use((response) => {
        return response
    }, (error) => {
        const status = error.response.status
        console.log('status error in the interceptors', status)
        
        if(status === 401 || status === 403){
            logOut()
            navigate('/login')
        }
        console.log(error.toString())
        return Promise.reject(error);
    })

    return axiosSecure
};

export default useAxiosSecure;
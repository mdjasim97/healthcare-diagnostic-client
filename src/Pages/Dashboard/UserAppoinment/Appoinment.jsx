import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import UserAppoinment from "../../../Components/AppoinmentCard/UserAppoinment";


const Appoinment = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { refetch, data: appoint = [] } = useQuery({
        queryKey: ["appoint"],
        queryFn: async () => {
            if (!user.email) return [];
            const { data } = await axiosSecure.get(`myApponment/${user?.email}`)
            return data
        }
    })


    // console.log(appoint)
    return (
        <div>
            <h2 className="text-5xl font-bold text-center bg-orange-300 py-5">Upcomming Test</h2>
            {
                appoint.filter(meet => meet.status === 'pending').map(card => <UserAppoinment key={card._id} appoinmentCard={card} refetch={refetch}>
                </UserAppoinment>)
            }

        </div>
    );
};

export default Appoinment;
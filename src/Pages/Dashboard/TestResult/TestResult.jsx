import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserAppoinment from "../../../Components/AppoinmentCard/UserAppoinment";


const TestResult = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { refetch, data: completeTest = [] } = useQuery({
        queryKey: ["completeTest"],
        queryFn: async () => {
            if (!user.email) return [];
            const { data } = await axiosSecure.get(`myApponment/${user?.email}`)
            return data
        }
    })

    console.log(completeTest)

    return (
        <div>
            <h2 className="text-5xl font-bold text-center bg-orange-300 py-5">Upcomming Test</h2>
            {
                completeTest.filter(meet => meet.status === 'Delivered').map(card => <UserAppoinment key={card._id} appoinmentCard={card} refetch={refetch}>
                </UserAppoinment>)
            }
        </div>
    );
};

export default TestResult;
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import DashboardLayout from "../Layout/DashboardLayout";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import Appoinment from "../Pages/Dashboard/UserAppoinment/Appoinment";
import TestResult from "../Pages/Dashboard/TestResult/TestResult";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import AddTest from "../Pages/Dashboard/AdminDashboard/AddTest/AddTest";
import AddBannar from "../Pages/Dashboard/AdminDashboard/AddBannar/AddBannar";
import AllTest from "../Pages/Dashboard/AdminDashboard/AllTest/AllTest";
import Reservation from "../Pages/Dashboard/AdminDashboard/Reservation/Reservation";
import ServicePage from "../Pages/ServicesPage/ServicePage";
import AdminRoute from './AdminRoute';
import PrivateRoute from "./PrivateRoute";
import ServicesDetails from '../Pages/ServiceDetails/ServicesDetails';
import UpdateTest from "../Pages/Dashboard/AdminDashboard/UpdateTest/UpdateTest";
import AllBannar from "../Pages/Dashboard/AdminDashboard/AllBannar/AllBannar";
import Statistics from "../Pages/Dashboard/AdminDashboard/Statistics/Statistics";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,

        children: [
            {
                path: "/",
                element: <HomePage></HomePage>,
                loader: () => fetch('http://localhost:5000/doctorTipes')
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "login",
                element: <SignIn></SignIn>
            },
            {
                path: 'services',
                element: <ServicePage />
            },

            {
                path: 'services/:id',
                element: <PrivateRoute><ServicesDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/alltest/${params.id}`)
            },
            {
                path: 'updateTest/:id',
                element: (<PrivateRoute><AdminRoute><UpdateTest /></AdminRoute></PrivateRoute>),
                loader: ({ params }) => fetch(`http://localhost:5000/alltest/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: 'userProfile',
                element: <PrivateRoute><UserProfile /></PrivateRoute>
            },
            {
                path: 'appoinment',
                element: <Appoinment />
            },
            {
                path: 'testResult',
                element: <PrivateRoute><TestResult /></PrivateRoute>
            },

            // Admin related route
            {
                path: 'addBannar',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AddBannar />
                        </AdminRoute>
                    </PrivateRoute>
            },

            {
                path: 'allBannar',
                element: <PrivateRoute> <AdminRoute><AllBannar /></AdminRoute></PrivateRoute>
            },

            {
                path: 'allUsers',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AllUsers />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: 'addTest',
                element:
                    (<PrivateRoute>
                        <AdminRoute>
                            <AddTest />
                        </AdminRoute>
                    </PrivateRoute>)
            },

            {
                path: 'allTest',
                element: <PrivateRoute><AllTest /></PrivateRoute>
            },
            {
                path: 'statistic',
                element: <PrivateRoute><Statistics /></PrivateRoute>
            },
            {
                path: 'reservation',
                element: <Reservation />
            },
        ]
    }
])

export default router;
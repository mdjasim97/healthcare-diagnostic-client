import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import DashboardLayout from "../Layout/DashboardLayout";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import Appoinment from "../Pages/Dashboard/Appoinment/Appoinment";
import TestResult from "../Pages/Dashboard/TestResult/TestResult";
import BannarContent from "../Pages/Dashboard/BannerContent/BannarContent";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import AddTest from "../Pages/Dashboard/AdminDashboard/AddTest/AddTest";
import AddBannar from "../Pages/Dashboard/AdminDashboard/AddBannar/AddBannar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,

        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "login",
                element: <SignIn></SignIn>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,

        children: [
            {
                path: 'userProfile',
                element: <UserProfile />
            },
            {
                path: 'appoinment/:email',
                element: <Appoinment />,
                loader: ({ params }) => fetch(`http://localhost:5000/users/${params.email}`, { credentials: true })
            },
            {
                path: 'testResult',
                element: <TestResult />
            },
            {
                path: 'addBannar',
                element: <AddBannar />
            }, 
            {
                path: 'allUsers',
                element: <AllUsers />
            }, 
            {
                path: 'addTest',
                element: <AddTest />
            }, 
        ]
    }
])

export default router;
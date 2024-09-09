import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement : <ErrorPage></ErrorPage>,
        
        children : [
            {
                path : "/",
                element : <HomePage></HomePage>
            },
            {
                path : "signup",
                element : <SignUp></SignUp>
            }
        ]
    }
])

export default router;
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement : <ErrorPage></ErrorPage>,
        
        children : [
            {
                path : "/",
                element : <HomePage></HomePage>
            }
        ]
    }
])

export default router;
import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/Error/ErrorPage";
import PrivateRoute from "../routes/PrivateRoute";
import AddCar from "../pages/AddCar/AddCar";
import AvailableCars from "../pages/AvailableCars/AvailableCars";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },

        {
          path:'addCar',
          element:<PrivateRoute><AddCar></AddCar></PrivateRoute>


        },
        {
     
      path:'available_cars',
      Component:AvailableCars
        },
        {
            path:'register',
            Component:Register

        },
        {
            path:'login',
            Component:Login
        },
      
    ]
  },

    {
            path: '/*',
            Component: ErrorPage
        },
]);

export default router;
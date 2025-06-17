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
import CarDetails from "../pages/CarDetails/CarDetails";
import CarBooking from "../pages/CarBooking";
import MyBookings from "../pages/MyBookings/MyBookings";
import MyAddedCar from "../pages/MyAddedCar/MyAddedCar";

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
          path:'myCars',
          element:<PrivateRoute><MyAddedCar></MyAddedCar></PrivateRoute>

        },
        {
     
      path:'available_cars',
      Component:AvailableCars
        },
        {
          path:'/cars/:id',
          Component:CarDetails,
          loader:({params})=>fetch(`http://localhost:3000/cars/${params.id}`)
        },
        {
          path:'carBooking/:id',
          element:<PrivateRoute><CarBooking></CarBooking></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:3000/cars/${params.id}`)
        },
        {
           path:'myBookings',
           element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>
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
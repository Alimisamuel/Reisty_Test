import React from "react";
import { useRoutes } from "react-router-dom";
import Waitlist from "./Waitlist";
import Login from "./Waitlist/Pages/Auth/Login";
import Register from "./Waitlist/Pages/Auth/Register";
import Pricing from "./Waitlist/Pages/Pricing";
import GetStarted from "./Waitlist/Pages/GetStarted";
import {
  BasicInformation,
  Experience,
  Gallery,
  Menu,
  Offerings,
  ReservationHours,
  RestaurantProfile,
  GuestBook,
  Tables,
  SharedLayout,
} from "./Dashboard/Pages/Dashboard";
import Dashboard from "./Dashboard/Pages/Dashboard/Dashboard";
import QuickSetup from "./Dashboard/Components/RestaurantProfile/QuickSetup";
import FloorPlan from "./Dashboard/Components/RestaurantProfile/FloorPlan";
import ProtectedRoute from "./Utility/ProtectedRoute";
import Reservations from "./Dashboard/Pages/Sections/Reservations";
import GuestBookMain from "./Dashboard/Pages/Sections/GuestBookMain";
import Guest from "./Dashboard/Components/Reservations/Guest";
import GuestOutlet from "./Dashboard/Pages/Sections/GuestOutlet";
import Room from "./Dashboard/Components/Tables/Room";
import ReservationManagement from "./Dashboard/Components/Reservations/ReservationManagement";
import CustomerSupport from "./Waitlist/Component/Support/CustomerSupport";
import Faq from "./Waitlist/Component/Support/Faq";
import Tutorial from "./Waitlist/Component/Support/Tutorial";
import SelectRestaurant from "./Dashboard/Pages/Sections/SelectRestaurant";
import { motion } from "framer-motion";
import Ticket from "./Dashboard/Components/Experience/Ticket";

export function Routes() {
  const fadeInOutVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideInVariants = {
    initial: { x: "-100vw" },
    animate: { x: 0 },
    exit: { x: "-100vw" },
  };
    const scaleVariants = {
      initial: { scale: 0 },
      animate: { scale: 1 },
      exit: { scale: 0 },
    };

    const rotateVariants = {
      initial: { rotate: -180 },
      animate: { rotate: 0 },
      exit: { rotate: 180 },
    };

    const colorVariants = {
      initial: { color: "#ff0000" },
      animate: { color: "#00ff00" },
      exit: { color: "#0000ff" },
    };
  let element = useRoutes([
    {
      path: "/",
      element: (

          <Waitlist />
 
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/pricing",
      element: (

          <Pricing />

      ),
    },
    {
      path: "/get-started",
      element: <GetStarted />,
    },
    {
      path: "/quick-setup",
      element: <QuickSetup />,
    },
    {
      path: "/customer-support",
      element: (
        <motion.div
          variants={fadeInOutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <CustomerSupport />
        </motion.div>
      ),
    },
    {
      path: "/faq",
      element: <Faq />,
    },
    {
      path: "/tutorials",
      element: <Tutorial />,
    },
    {
      path: "/dashboard/select",
      element: (
        <ProtectedRoute>
  
            <SelectRestaurant />
        
        </ProtectedRoute>
      ),
    },

    {
      // path: "/reservations",
      element: <Reservations />,
      children: [
        {
          path: "/reservations",
          element: <GuestOutlet />,
        },
        {
          path: "/guest-book",
          element: <GuestBookMain />,
        },
      ],
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
               <motion.div
          variants={slideInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Dashboard />
          </motion.div>
        </ProtectedRoute>
      ),
    },
    {
      element: <SharedLayout />,
      children: [
        {
          path: "/dashboard/restaurantprofile",
          element: <RestaurantProfile />,
        },
        {
          path: "/dashboard/basic-information",
          element: <BasicInformation />,
        },
        {
          path: "/dashboard/offerings",
          element: <Offerings />,
        },
        {
          path: "/dashboard/experience",
          element: <Experience />,
        },
        {
          path: "/dashboard/gallery-photos",
          element: <Gallery />,
        },
        {
          path: "/dashboard/guest-book",
          element: <GuestBook />,
        },
        {
          path: "/dashboard/guest-book-main",
          element: <GuestBookMain />,
        },

        {
          path: "/dashboard/menu",
          element: <Menu />,
        },
        {
          path: "/dashboard/table-rooms",
          element: <Tables />,
        },
        {
          path: "/dashboard/room/:id",
          element: <Room />,
        },
        {
          path: "/reservation-management",
          element: <ReservationManagement />,
        },
        {
          path: "/floor-plan",
          element: <FloorPlan />,
        },
        {
          path: "/dashboard/reservation-hours",
          element: <ReservationHours />,
        },
        {
          path:'/dashboard/experience/tickets/:name/:id',
          element:<Ticket/>,
        }
      ],
    },
  ]);
  return element;
}

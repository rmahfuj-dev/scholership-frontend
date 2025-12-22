import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassowrd";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFail from "../pages/PaymentFail/PaymentFail";
import DashBoardLayout from "../layout/DashBoardLayout/DashBoardLayout";
import AddScholarship from "../pages/DashBoard/AddScholarship/AddScholarship";
import DashBoardHome from "../pages/DashBoard/DashBoardHome/DashBoardHome";
import UserProfile from "../pages/DashBoard/UserProfile/UserProfile";
import ManageScholarships from "../pages/DashBoard/ManageScholarships/ManageScholarships";
import EditScholarship from "../pages/DashBoard/ManageScholarships/EditScholarship/EditScholarship";
import ManageUsers from "../pages/DashBoard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute/AdminRoute";
import ModeratorRoute from "./ModeratorRoute/ModeratorRoute";
import ManageApplications from "../pages/DashBoard/Moderator/ManageApplications/ManageApplications";
import ManageReviews from "../pages/DashBoard/Moderator/ManageReviews/ManageReviews";
import MyApplications from "../pages/DashBoard/Student/MyApplications/MyApplications";
import ApplyScholarship from "../pages/ScholarshipDetails/ApplyScholarship";
import EditApplication from "../pages/DashBoard/Student/EditApplication/EditApplication";
import MyReviews from "../pages/DashBoard/Student/MyReviews/MyReviews";
import WishList from "../pages/WishList/WishList";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/scholarships",
        Component: AllScholarships,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/signUp",
        Component: SignUp,
      },
      {
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/scholarship/:id/apply",
        element: (
          <PrivateRoute>
            <ApplyScholarship />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/fail",
        element: (
          <PrivateRoute>
            <PaymentFail />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        Component: DashBoardHome,
      },
      //! Admin route
      {
        path: "/dashboard/add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/edit-scholarship/:id",
        element: (
          <AdminRoute>
            <EditScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      //! Admin Route
      {
        path: "/dashboard/me",
        Component: UserProfile,
      },
      //? Moderator Route
      {
        path: "/dashboard/manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <ModeratorRoute>
            <ManageReviews />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/edit-application/:id",
        element: (
          <PrivateRoute>
            <EditApplication />
          </PrivateRoute>
        ),
      },
      //? Moderator Route
      // Student
      {
        path: "/dashboard/my-application",
        Component: MyApplications,
      },
      {
        path: "/dashboard/my-reviews",
        Component: MyReviews,
      },
      // Student
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
export default router;

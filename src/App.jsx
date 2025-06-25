import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/Animations/LoadingSpinner";
import AuthLayout from "./layouts/Auth";
import ProtectedRoute from "./components/Layouts/Protected/ProtectedRoute"; // aktifkan kembali
import { Toaster } from "react-hot-toast";

// Lazy Layouts
const DashboardLayout = lazy(() => import("./layouts/Dashboard"));
const HomeLayout = lazy(() => import("./layouts/Home"));

// Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard/main"));
const Categories = lazy(() => import("./pages/Dashboard/Categories"));
const Roles = lazy(() => import("./pages/Dashboard/Roles"));
const Posts = lazy(() => import("./pages/Dashboard/Posts"));
const Comments = lazy(() => import("./pages/Dashboard/Comments"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const NotFound = lazy(() => import("./pages/Error/NotFound"));

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* 🌐 Public (Home) */}
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* 🔐 Auth Routes (Login/Register) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 🔒 Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route path="/dashboard/roles" element={<Roles />} />
            <Route path="/dashboard/posts" element={<Posts />} />
            <Route path="/dashboard/comments" element={<Comments />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>

          {/* 🛑 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* React Hot Toast */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options
          className: "",
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Custom options for success
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          // Custom options for error
          error: {
            duration: 4000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
    </Router>
  );
}

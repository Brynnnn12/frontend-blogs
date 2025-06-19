import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
// import ProtectedRoute from "./components/ProtectedRoute"; // Komponen proteksi
import LoadingSpinner from "./components/Animations/LoadingSpinner"; // Fallback loading

// Lazy loading untuk optimasi
const AuthLayout = lazy(() => import("./layouts/Auth"));
const DashboardLayout = lazy(() => import("./layouts/Dashboard"));
const HomeLayout = lazy(() => import("./layouts/Home"));

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard/main"));
const Categories = lazy(() => import("./pages/Dashboard/Categories"));
const Roles = lazy(() => import("./pages/Dashboard/Roles"));
const Posts = lazy(() => import("./pages/Dashboard/Posts"));
const Comments = lazy(() => import("./pages/Dashboard/Comments"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/Error/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          > */}
          <Route element={<DashboardLayout />}>
            {/* Redirect to dashboard if already logged in */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route path="/dashboard/roles" element={<Roles />} />
            <Route path="/dashboard/posts" element={<Posts />} />
            <Route path="/dashboard/comments" element={<Comments />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>

          {/* Error Handling */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

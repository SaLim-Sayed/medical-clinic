import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointents";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
             <Route
              path="/appointments"
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
            />
             <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoutes>
                  <DoctorAppointments />
                </ProtectedRoutes>
              }
            />
          <Route
            path="/apply-doctor"
            exact
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
              <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoutes>
                  <BookingPage />
                </ProtectedRoutes>
              }
            />
          <Route
            path="/notification"
            exact
            element={
              <ProtectedRoutes>
                <NotificationPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/doctors"
            exact
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            exact
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
           <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

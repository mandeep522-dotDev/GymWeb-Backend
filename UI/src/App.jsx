import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Classes from "./pages/Classes"
import UserPayment from "./pages/user/UserPayment.jsx"
import ContactUs from "./pages/ContactUs.jsx"

// Protected Routes
import AdminDashboard from "./pages/admin/AdminDashboard"
import UserDashboard from "./pages/user/UserDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminClasses from "./pages/admin/AdminClasses"

// Auth Pages
import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminLayout from "./components/admin/AdminLayout"
import UpdateProfile from "./pages/user/UpdateProfile.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";
import Subscriber from "./pages/admin/Subscribers.jsx"


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path= "/classes" element={<Classes />} />
          <Route path= "/classes" element={<Classes />} />
          <Route path= "/contact" element={<ContactUs />} />
          <Route path="/dashboard/update-profile" element={<UpdateProfile />} />
          <Route path="/dashboard/change-password" element={<ChangePassword />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute roles={["user","admin"]}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/classes" 
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout>
                  <AdminClasses />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/subscribers" 
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout>
                  <Subscriber />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/payment" element={<UserPayment />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App

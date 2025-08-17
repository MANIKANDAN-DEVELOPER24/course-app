// import React, { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Container from '@mui/material/Container'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Cart from './pages/Cart'
// import Checkout from './pages/Checkout'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import OffersTicker from './components/OffersTicker';


// export default function App() {
//   const [user, setUser] = useState(() => {
//     try { return JSON.parse(localStorage.getItem('welearn_user')) } catch { return null }
//   })
//   const [cart, setCart] = useState(() => {
//     try { return JSON.parse(localStorage.getItem('welearn_cart')) || [] } catch { return [] }
//   })

//   useEffect(() => { localStorage.setItem('welearn_user', JSON.stringify(user)) }, [user])
//   useEffect(() => { localStorage.setItem('welearn_cart', JSON.stringify(cart)) }, [cart])

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//         }}
//       >

//         <Header user={user} setUser={setUser} cartCount={cart.length} />
//         <OffersTicker />
//         <Container sx={{ mt: 4, mb: 6 }}>
//           <Routes>
//             <Route path="/" element={<Home user={user} cart={cart} setCart={setCart} />} />
//             <Route path="/login" element={<Login setUser={setUser} />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//             <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} />} />
//             <Route
//               path="/admin/*"
//               element={
//                 (user?.role === 'admin' || user?.is_superuser)
//                   ? <AdminDashboard />
//                   : <Navigate to="/" replace />
//               }
//             />

//           </Routes>
//         </Container>
//         <Footer />   </div>
//     </>
//   )
// }


// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Container from "@mui/material/Container";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import OffersTicker from "./components/OffersTicker";
// import api from "./api/axiosConfig";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("welearn_cart")) || [];
//     } catch {
//       return [];
//     }
//   });
//   const [loading, setLoading] = useState(true);

//   // ✅ Load user from token
//   useEffect(() => {
//     const access = localStorage.getItem("access");
//     if (!access) {
//       setLoading(false);
//       return;
//     }

//     api
//       .get("current-user/")
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.error("Token invalid or expired", err);
//         setUser(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // ✅ Persist cart
//   useEffect(() => {
//     localStorage.setItem("welearn_cart", JSON.stringify(cart));
//   }, [cart]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//       }}
//     >
//       <Header user={user} setUser={setUser} cartCount={cart.length} />
//       <OffersTicker />
//       <Container sx={{ mt: 4, mb: 6 }}>
//         <Routes>
//           <Route path="/" element={<Home user={user} cart={cart} setCart={setCart} />} />
//           <Route path="/login" element={<Login setUser={setUser} />} />
//           {/* <Route path="/register" element={<Register />} /> */}
//           <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//           <Route
//             path="/checkout"
//             element={
//               <Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} />
//             }
//           />
//           <Route
//             path="/admin/*"
//             element={
//               user?.role === "admin" || user?.is_superuser ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/" replace />
//               )
//             }
//           />
//         </Routes>
//       </Container>
//       <Footer />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Container from "@mui/material/Container"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CourseDetail from "../src/pages/CourseDetails"
import OffersTicker from "./components/OffersTicker"
import api from "./api/axiosConfig"
import CourseDetails from "../src/pages/CourseDetails"

export default function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("welearn_cart")) || []
    } catch {
      return []
    }
  })
  const [loading, setLoading] = useState(true)

  // Load user from token
  useEffect(() => {
    const access = localStorage.getItem("access")
    if (!access) {
      setLoading(false)
      return
    }

    api
      .get("current-user/")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Token invalid or expired", err)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // Persist cart
  useEffect(() => {
    localStorage.setItem("welearn_cart", JSON.stringify(cart))
  }, [cart])

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header user={user} setUser={setUser} cartCount={cart.length} />
      <OffersTicker />
      <Container sx={{ mt: 4, mb: 6 }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />

          {/* Combined Login/Register */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Course Detail Page */}
          <Route
            path="/course/:id"
            element={<CourseDetails cart={cart} setCart={setCart} />}
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} />}
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/*"
            element={
              user?.role === "admin" || user?.is_superuser ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

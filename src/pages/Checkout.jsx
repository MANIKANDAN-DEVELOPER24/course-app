// import React, { useState } from 'react'
// import { Typography, Button, Box } from '@mui/material'
// import api from '../api/axiosConfig'
// import { useNavigate } from 'react-router-dom'

// export default function Checkout({ cart, setCart, user, setUser }) {
//   const [message, setMessage] = useState(null)
//   const nav = useNavigate()
// const confirm = async () => {
//   if (!user) { setMessage('Please login before checkout.'); return }
//   try {
//     const course_ids = cart.map(c => c.id);
//     await api.post('checkout/', { course_ids }); // Bearer token auto-added by axios
//     setMessage('Purchase successful!');
//     setCart([]);
//     setTimeout(() => nav('/'), 1200);
//   } catch (err) {
//     console.error(err.response?.data || err);
//     setMessage('Checkout failed');
//   }
// };


//   return (
//     <Box>
//       <Typography variant="h5" sx={{ mb: 2 }}>Checkout</Typography>
//       {message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
//       <Button variant="contained" onClick={confirm}>Confirm Purchase</Button>
//     </Box>
//   )
// }


// import React, { useState } from 'react';
// import { Typography, Button, Box } from '@mui/material';
// import api from '../api/axiosConfig';
// import { useNavigate } from 'react-router-dom';

// export default function Checkout({ cart, setCart, user }) {
//   const [message, setMessage] = useState(null);
//   const nav = useNavigate();

//   const confirm = async () => {
//     if (!user) {
//       setMessage('Please login before checkout.');
//       return;
//     }

//     try {
//       const course_ids = cart.map(c => c.id);
//       await api.post('checkout/', { course_ids }); // ✅ Session cookie will be sent
//       setMessage('Purchase successful!');
//       setCart([]);
//       setTimeout(() => nav('/'), 1200);
//     } catch (err) {
//       console.error(err.response?.data || err);
//       setMessage(err.response?.data?.error || 'Checkout failed');
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ mb: 2 }}>Checkout</Typography>
//       {message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
//       <Button variant="contained" onClick={confirm}>
//         Confirm Purchase
//       </Button>
//     </Box>
//   );
// }

// import React, { useState } from "react";
// import { Typography, Button, Box } from "@mui/material";
// import api from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";

// export default function Checkout({ cart, setCart, user }) {
//   const [message, setMessage] = useState(null);
//   const nav = useNavigate();

//   const confirm = async () => {
//     if (!user) {
//       setMessage("Please login before checkout.");
//       setTimeout(() => nav("/login"), 1000);
//       return;
//     }

//     const course_ids = cart.map((c) => c.id);
//     if (course_ids.length === 0) {
//       setMessage("No courses selected for checkout.");
//       return;
//     }

//     try {
//       await api.post("checkout/", { course_ids });
//       setMessage("✅ Purchase successful!");
//       setCart([]);
//       setTimeout(() => nav("/"), 1200);
//     } catch (err) {
//       console.error(err.response?.data || err);
//       setMessage(err.response?.data?.error || "❌ Checkout failed");
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Checkout
//       </Typography>

//       {message && (
//         <Typography
//           sx={{ mb: 2 }}
//           color={message.startsWith("✅") ? "green" : "error"}
//         >
//           {message}
//         </Typography>
//       )}

//       <Button variant="contained" onClick={confirm}>
//         Confirm Purchase
//       </Button>
//     </Box>
//   );
// }

import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, setCart, user }) {
  const [message, setMessage] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Step 1: Preview Checkout
  const handlePreview = async () => {
    if (!user) {
      setMessage("⚠️ Please login before checkout.");
      setTimeout(() => nav("/login"), 1200);
      return;
    }

    const course_ids = cart.map((c) => c.id);
    if (course_ids.length === 0) {
      setMessage("⚠️ No courses selected for checkout.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("checkout/preview/", { course_ids });
      setSummary(res.data);
      setMessage(null);
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.error || "❌ Checkout preview failed.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Confirm Purchase
  const handleConfirm = async () => {
    if (!user) {
      setMessage("⚠️ Please login before confirming purchase.");
      setTimeout(() => nav("/login"), 1200);
      return;
    }

    setLoading(true);
    try {
      await api.post("checkout/confirm/", { course_ids: cart.map((c) => c.id) });
      setMessage("✅ Purchase successful!");
      setCart([]);
      setSummary(null);
      setTimeout(() => nav("/"), 1500);
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.error || "❌ Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Checkout
      </Typography>

      {message && (
        <Typography
          sx={{ mb: 2 }}
          color={message.startsWith("✅") ? "green" : "error"}
        >
          {message}
        </Typography>
      )}

      {/* If no summary yet → show Preview button */}
      {!summary ? (
        <Button variant="contained" onClick={handlePreview} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Proceed to Checkout"}
        </Button>
      ) : (
        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          {summary.courses.map((c) => (
            <Typography key={c.id}>
              {c.name} — ₹{c.price}
            </Typography>
          ))}

          <Divider sx={{ my: 1 }} />
          <Typography>Total: ₹{summary.total_price}</Typography>
          <Typography>Discount: -₹{summary.discount}</Typography>
          <Typography>GST: +₹{summary.gst}</Typography>

          <Typography variant="h6" sx={{ mt: 1 }}>
            Final Amount: ₹{summary.final_amount}
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Confirm Purchase"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

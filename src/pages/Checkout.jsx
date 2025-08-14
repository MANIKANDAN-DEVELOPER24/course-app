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

import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, setCart, user }) {
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  const confirm = async () => {
    if (!user) {
      setMessage("Please login before checkout.");
      setTimeout(() => nav("/login"), 1000);
      return;
    }

    const course_ids = cart.map((c) => c.id);
    if (course_ids.length === 0) {
      setMessage("No courses selected for checkout.");
      return;
    }

    try {
      await api.post("checkout/", { course_ids });
      setMessage("✅ Purchase successful!");
      setCart([]);
      setTimeout(() => nav("/"), 1200);
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.error || "❌ Checkout failed");
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

      <Button variant="contained" onClick={confirm}>
        Confirm Purchase
      </Button>
    </Box>
  );
}

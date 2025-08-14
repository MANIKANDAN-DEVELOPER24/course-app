// import React, { useState } from 'react'
// import { Box, TextField, Button, Typography } from '@mui/material'
// import api from '../api/axiosConfig'
// import { useNavigate } from 'react-router-dom'

// export default function Login({ setUser }) {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     setError(null)
//     try {
//       const res = await api.post('login/', { username, password })
//       setUser(res.data)
//       localStorage.setItem('welearn_user', JSON.stringify(res.data))
//       nav('/')
//     } catch (err) {
//       setError('Login failed — check credentials')
//     }
//   }

//   return (
//     <Box sx={{ maxWidth: 420, mx: 'auto' }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
//       <form onSubmit={submit}>
//         <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
//         <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
//         {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
//         <Button variant="contained" type="submit">Login</Button>
//       </form>
//     </Box>
//   )
// }


// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import api from '../api/axiosConfig';
// import { useNavigate } from 'react-router-dom';

// export default function Login({ setUser }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const nav = useNavigate();

//   const submit = async (e) => {
//   e.preventDefault();
//   setError(null);
//   try {
//     const res = await api.post('login/', { username, password });
//     setUser(res.data);
//     localStorage.setItem('welearn_user', JSON.stringify(res.data));
//     nav('/');
//   } catch (err) {
//     setError(err.response?.data?.error || 'Login failed');
//   }
// };


//   return (
//     <Box sx={{ maxWidth: 420, mx: 'auto' }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
//       <form onSubmit={submit}>
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
//         <Button variant="contained" type="submit">Login</Button>
//       </form>
//     </Box>
//   );
// }

import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1️⃣ Login: get access & refresh tokens
      const res = await api.post("login/", { username, password });
      const { access, refresh } = res.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // 2️⃣ Get user profile using new access token immediately
      const profileRes = await api.get("current-user/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      // 3️⃣ Save user in state + localStorage
      setUser(profileRes.data);
      localStorage.setItem("welearn_user", JSON.stringify(profileRes.data));

      // 4️⃣ Redirect to home
      nav("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
}

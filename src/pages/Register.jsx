import React, { useState } from 'react'
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material'
import api from '../api/axiosConfig'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await api.post('register/', { username, email, password, role })
      nav('/login')
    } catch (err) {
      setError('Registration failed')
    }
  }

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Register</Typography>
      <form onSubmit={submit}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField select label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth sx={{ mb: 2 }}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button variant="contained" type="submit">Register</Button>
      </form>
    </Box>
  )
}

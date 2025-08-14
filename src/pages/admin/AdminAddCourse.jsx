
import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import api from '../../api/axiosConfig'

export default function AdminAddCourse() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    instructor: '',
    duration: '',
    ratings: '',
    description: '',
    image: null
  })
  const [message, setMessage] = useState(null)

  const onChange = (k) => (e) => {
    if (k === 'image') {
      setForm({ ...form, image: e.target.files[0] })
    } else {
      setForm({ ...form, [k]: e.target.value })
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('price', form.price)
      formData.append('instructor', form.instructor)
      formData.append('duration', form.duration)
      formData.append('ratings', form.ratings)
      formData.append('description', form.description)
      if (form.image) {
        formData.append('image', form.image)
      }

      await api.post('courses/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setMessage('Course added successfully!')
      setForm({
        name: '',
        price: '',
        instructor: '',
        duration: '',
        ratings: '',
        description: '',
        image: null
      })
    } catch (err) {
      console.error(err)
      setMessage('Failed to add course')
    }
  }

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Add Course</Typography>
      {message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
      <form onSubmit={submit}>
        <TextField label="Course Name" value={form.name} onChange={onChange('name')} fullWidth sx={{ mb: 2 }} />
        <TextField label="Price" value={form.price} onChange={onChange('price')} fullWidth sx={{ mb: 2 }} />
        <TextField label="Instructor" value={form.instructor} onChange={onChange('instructor')} fullWidth sx={{ mb: 2 }} />
        <TextField label="Duration" value={form.duration} onChange={onChange('duration')} fullWidth sx={{ mb: 2 }} />
        <TextField label="Ratings" value={form.ratings} onChange={onChange('ratings')} fullWidth sx={{ mb: 2 }} />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Image
          <input type="file" hidden onChange={onChange('image')} />
        </Button>
        <TextField label="Description" value={form.description} onChange={onChange('description')} fullWidth multiline rows={3} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit">Add Course</Button>
      </form>
    </Box>
  )
}


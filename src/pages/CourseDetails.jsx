// // import React, { useEffect, useState } from 'react'
// // import { useParams, useNavigate } from 'react-router-dom'
// // import { Box, Typography, Button, Rating, CircularProgress, Grid } from '@mui/material'
// // import Snackbar from '@mui/material/Snackbar'
// // import Alert from '@mui/material/Alert'
// // import api from '../api/axiosConfig'

// // export default function CourseDetails({ cart, setCart }) {
// //   const { id } = useParams()
// //   const nav = useNavigate()
// //   const [course, setCourse] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

// //   useEffect(() => {
// //     let mounted = true
// //     async function load() {
// //       try {
// //         const res = await api.get(`courses/${id}/`) // fetch single course
// //         if (mounted) setCourse(res.data)
// //       } catch (err) {
// //         console.error(err)
// //       } finally {
// //         if (mounted) setLoading(false)
// //       }
// //     }
// //     load()
// //     return () => (mounted = false)
// //   }, [id])

// //   const addToCart = (course) => {
// //     if (cart.find((c) => c.id === course.id)) {
// //       setSnackbar({ open: true, message: 'Course already in cart', severity: 'warning' })
// //       return
// //     }
// //     setCart([...cart, course])
// //     setSnackbar({ open: true, message: 'Course added to cart', severity: 'success' })
// //   }

// //   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

// //   if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />
// //   if (!course) return <Typography>Course not found</Typography>

// //   return (
// //     <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, mb: 6, px: 2 }}>
// //       {/* Back button */}
// //       <Button variant="outlined" sx={{ mb: 3 }} onClick={() => nav(-1)}>
// //         &larr; Back to Courses
// //       </Button>

// //       <Grid container spacing={4}>
// //         {/* Image */}
// //         <Grid item xs={12} md={5}>
// //           <img
// //             src={course.image || 'https://via.placeholder.com/600x400'}
// //             alt={course.name}
// //             style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
// //           />
// //         </Grid>

// //         {/* Details */}
// //         <Grid item xs={12} md={7}>
// //           <Typography variant="h4" gutterBottom>{course.name}</Typography>
// //           <Typography variant="h6" gutterBottom>Instructor: {course.instructor}</Typography>
// //           <Typography variant="body1" gutterBottom>Duration: {course.duration}</Typography>
// //           <Typography variant="h5" gutterBottom>Price: ${course.price}</Typography>
// //           <Rating value={Number(course.ratings) || 0} readOnly precision={0.1} size="medium" sx={{ mb: 2 }} />
// //           <Typography variant="body1" gutterBottom>{course.description}</Typography>
// //           <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => addToCart(course)}>
// //             Add to Cart
// //           </Button>
// //         </Grid>
// //       </Grid>

// //       {/* Snackbar */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //       >
// //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   )
// // }


// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { Box, Typography, Button, Rating, CircularProgress, Grid } from '@mui/material'
// import Snackbar from '@mui/material/Snackbar'
// import Alert from '@mui/material/Alert'
// import api from '../api/axiosConfig'

// export default function CourseDetails({ cart, setCart, user }) {
//   const { id } = useParams()
//   const nav = useNavigate()
//   const [course, setCourse] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

//   useEffect(() => {
//     let mounted = true
//     async function load() {
//       try {
//         const res = await api.get(`courses/${id}/`) // fetch single course
//         if (mounted) setCourse(res.data)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }
//     load()
//     return () => (mounted = false)
//   }, [id])

//   const addToCart = (course) => {
//     if (!user) {
//       setSnackbar({ open: true, message: 'Please login to add course to cart', severity: 'error' })
//       setTimeout(() => nav('/login'), 1200) // redirect after 1.2s
//       return
//     }

//     if (cart.find((c) => c.id === course.id)) {
//       setSnackbar({ open: true, message: 'Course already in cart', severity: 'warning' })
//       return
//     }
//     setCart([...cart, course])
//     setSnackbar({ open: true, message: 'Course added to cart', severity: 'success' })
//   }

//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

//   if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />
//   if (!course) return <Typography>Course not found</Typography>

//   return (
//     <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, mb: 6, px: 2 }}>
//       {/* Back button */}
//       <Button variant="outlined" sx={{ mb: 3 }} onClick={() => nav(-1)}>
//         &larr; Back to Courses
//       </Button>

//       <Grid container spacing={4}>
//         {/* Image */}
//         <Grid item xs={12} md={5}>
//           <img
//             src={course.image || 'https://via.placeholder.com/600x400'}
//             alt={course.name}
//             style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
//           />
//         </Grid>

//         {/* Details */}
//         <Grid item xs={12} md={7}>
//           <Typography variant="h4" gutterBottom>{course.name}</Typography>
//           <Typography variant="h6" gutterBottom>Instructor: {course.instructor}</Typography>
//           <Typography variant="body1" gutterBottom>Duration: {course.duration}</Typography>
//           <Typography variant="h5" gutterBottom>Price: ${course.price}</Typography>
//           <Rating value={Number(course.ratings) || 0} readOnly precision={0.1} size="medium" sx={{ mb: 2 }} />
//           <Typography variant="body1" gutterBottom>{course.description}</Typography>
//           <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => addToCart(course)}>
//             Add to Cart
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   )
// }


import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Rating, CircularProgress, Grid } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import api from '../api/axiosConfig'

export default function CourseDetails({ cart, setCart, user }) {
  const { id } = useParams()
  const nav = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await api.get(`courses/${id}/`)
        if (mounted) setCourse(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [id])

  const addToCart = (course) => {
    if (!user) {
      setSnackbar({ open: true, message: 'Please login to add course to cart', severity: 'error' })
      setTimeout(() => nav('/login'), 1200)
      return
    }
    if (cart.find((c) => c.id === course.id)) {
      setSnackbar({ open: true, message: 'Course already in cart', severity: 'warning' })
      return
    }
    setCart([...cart, course])
    setSnackbar({ open: true, message: 'Course added to cart', severity: 'success' })
  }

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />
  if (!course) return <Typography>Course not found</Typography>

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, mb: 6, px: 2 }}>
      <Button variant="outlined" sx={{ mb: 3 }} onClick={() => nav(-1)}>
        &larr; Back to Courses
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <img
            src={course.image || 'https://via.placeholder.com/600x400'}
            alt={course.name}
            style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom>{course.name}</Typography>
          <Typography variant="h6" gutterBottom>Instructor: {course.instructor}</Typography>
          <Typography variant="body1" gutterBottom>Duration: {course.duration}</Typography>
          <Typography variant="h5" gutterBottom>Price: ${course.price}</Typography>
          <Rating value={Number(course.ratings) || 0} readOnly precision={0.1} size="medium" sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom>{course.description}</Typography>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => addToCart(course)}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

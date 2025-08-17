// import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import CardMedia from '@mui/material/CardMedia'
// import CardContent from '@mui/material/CardContent'
// import CardActions from '@mui/material/CardActions'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'
// import Rating from '@mui/material/Rating'
// import CircularProgress from '@mui/material/CircularProgress'
// import api from '../api/axiosConfig'

// export default function Home({ cart, setCart }) {
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let mounted = true
//     async function load() {
//       try {
//         const res = await api.get('all-courses/')
//         if (mounted) setCourses(res.data)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }
//     load()
//     return () => (mounted = false)
//   }, [])

//   const addToCart = (course) => {
//     if (cart.find((c) => c.id === course.id)) return
//     setCart([...cart, course])
//   }

//   if (loading) return <CircularProgress />

//   return (
//     <Grid container spacing={2}>
//       {courses.map((course) => (
//         <Grid item xs={12} sm={6} md={4} key={course.id}>
//           <Card>
//             <CardMedia component="img" height="160" image={course.image || 'https://via.placeholder.com/400x200'} alt={course.name} />
//             <CardContent>
//               <Typography variant="h6">{course.name}</Typography>
//               <Typography variant="body2" color="text.secondary">{course.instructor} • {course.duration}</Typography>
//               <Typography variant="subtitle1" sx={{ mt: 1 }}>${course.price}</Typography>
//               <Rating value={Number(course.ratings) || 0} readOnly precision={0.1} size="small" />
//               <Typography variant="body2" sx={{ mt: 1 }}>{course.description}</Typography>
//             </CardContent>
//             <CardActions>
//               <Button size="small" onClick={() => addToCart(course)}>Add to cart</Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   )
// }
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import api from '../api/axiosConfig'

export default function Home({ cart, setCart }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await api.get('all-courses/')
        if (mounted) setCourses(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  const addToCart = (course) => {
    if (cart.find((c) => c.id === course.id)) {
      setSnackbar({ open: true, message: 'Course already in cart', severity: 'warning' })
      return
    }
    setCart([...cart, course])
    setSnackbar({ open: true, message: 'Course added to cart', severity: 'success' })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (loading) return <CircularProgress />

  return (
    <>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={course.image || 'https://via.placeholder.com/400x200'}
                alt={course.name}
              />
              <CardContent>
                <Typography variant="h6">{course.name}</Typography>
                <Typography variant="body2" color="text.secondary">{course.instructor} • {course.duration}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>${course.price}</Typography>
                <Rating value={Number(course.ratings) || 0} readOnly precision={0.1} size="small" />
                <Typography variant="body2" sx={{ mt: 1 }}>{course.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => addToCart(course)}>Add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for feedback */}
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
    </>
  )
}

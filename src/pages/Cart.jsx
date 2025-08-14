import React from 'react'
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Cart({ cart, setCart }) {
  const remove = (id) => setCart(cart.filter((c) => c.id !== id))
  const total = cart.reduce((s, c) => s + Number(c.price || 0), 0)

  if (!cart || cart.length === 0) return <Typography>No items in cart.</Typography>

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Cart</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.instructor}</TableCell>
                <TableCell>${c.price}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => remove(c.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell />
              <TableCell><strong>${total.toFixed(2)}</strong></TableCell>
              <TableCell><Button component={Link} to="/checkout" variant="contained">Checkout</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

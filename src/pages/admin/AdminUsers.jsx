import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import api from '../../api/axiosConfig'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const [uRes, pRes] = await Promise.all([
          api.get('users/'),
          api.get('purchases/').catch(() => ({ data: [] })),
        ])
        setUsers(uRes.data)
        setPurchases(pRes.data || [])
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  const purchasesByUser = (uid) => purchases.filter((p) => p.user?.id === uid)

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Purchased</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {purchasesByUser(u.id).length === 0 ? (
                    <em>None</em>
                  ) : (
                    purchasesByUser(u.id).map((p) => (
                      <div key={p.id}>{p.course?.name} — ${p.course?.price}</div>
                    ))
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

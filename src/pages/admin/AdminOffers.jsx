import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/axiosConfig';



import OffersTicker from '../../components/OffersTicker'; // Import ticker

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('offers/');
        setOffers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const add = async () => {
    try {
      const res = await api.post('offers/', { title, discount });
      setOffers((s) => [res.data, ...s]);
      setTitle('');
      setDiscount('');
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (offer) => {
    setEditingId(offer.id);
    setTitle(offer.title);
    setDiscount(offer.discount);
  };

  const update = async () => {
    try {
      const res = await api.put(`offers/${editingId}/`, { title, discount });
      setOffers((s) =>
        s.map((o) => (o.id === editingId ? res.data : o))
      );
      setEditingId(null);
      setTitle('');
      setDiscount('');
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`offers/${id}/`);
      setOffers((s) => s.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      {/* Live updating ticker */}
      {/* <OffersTicker offers={offers} /> */}

      <Typography variant="h6" sx={{ mb: 2 }}>Manage Offers</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        {editingId ? (
          <Button variant="contained" color="secondary" onClick={update}>
            Update Offer
          </Button>
        ) : (
          <Button variant="contained" onClick={add}>
            Add Offer
          </Button>
        )}
      </Box>
      <List>
        {offers.map((o) => (
          <ListItem
            key={o.id}
            secondaryAction={
              <>
                <IconButton color="primary" onClick={() => startEdit(o)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => remove(o.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={o.title} secondary={o.discount} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


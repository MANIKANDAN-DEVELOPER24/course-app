import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Marquee from "react-fast-marquee";
import { Box, Typography } from "@mui/material";

const OffersTicker = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get("/offers/")
      .then((res) => setOffers(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (offers.length === 0) return null;

  return (
    <Box sx={{ backgroundColor: "#ff9800", color: "#fff", py: 1 }}>
      <Marquee pauseOnHover gradient={false} speed={50}>
        {offers.map((offer, index) => (
          <Typography key={index} sx={{ mx: 3, fontWeight: "bold" }}>
            {offer.title} — {offer.discount}
          </Typography>
        ))}
      </Marquee>
    </Box>
  );
};

export default OffersTicker;
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 2,
        textAlign: "center",
        mt: "auto",
        boxShadow: "0 -1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} WeLearn — Learn anytime, anywhere.
      </Typography>
    </Box>
  );
}

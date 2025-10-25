import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <TrendingUpIcon sx={{ fontSize: 32 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              Currency Exchange Rates
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

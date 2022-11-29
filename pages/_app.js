import '../styles/global.css';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            VRAPP
          </Typography>
          <Stack direction="row" spacing={3}></Stack>
          <Button color="inherit" startIcon={<AddCircleIcon />}>
            Add new ad
          </Button>
          <Button color="inherit" startIcon={<AccountCircleIcon />}>
            Your profile
          </Button>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </>
  );
}

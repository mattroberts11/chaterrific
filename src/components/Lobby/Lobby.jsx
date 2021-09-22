
import { Container, Box, Button, Grid, Paper } from '@mui/material';


const Lobby = () => {
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Paper>Channel List</Paper>
            </Grid>
            <Grid xs="auto">
                <Paper>Chat</Paper>
            </Grid>
        </Grid>
    </Box>
}

export default Lobby;

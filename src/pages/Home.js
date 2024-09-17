import { Container, Typography, Button } from '@mui/material';
import welcomeImage from '../assets/agenda.jpg'

function Home() {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Bem-vindo ao Meu Aplicativo
            </Typography>
            <img src={welcomeImage} alt="Welcome" style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }} />
            <Typography variant="body1">

            </Typography>
            <Button variant="contained" color="primary" href="/agenda" style={{ marginTop: '20px' }}>
                Ver Contatos
            </Button>
        </Container>
    );
}

export default Home;
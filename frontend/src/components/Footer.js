import { Container, Button } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-light text-dark py-4">
    <Container className="text-center">
      <h6 style={{ fontWeight: 'bold', color: '#28a745' }}>
        Developed by Gyan with React & Django
      </h6>
      <p className="text-danger">
        <small>
          <i className="fas fa-exclamation-circle me-1"/> App is a work in progress, thank you for understanding <i className="fas fa-exclamation-circle ms-1"/>
        </small>
      </p>
      <Button 
        variant="outline-dark" 
        className="mb-3 mt-3"
        href="https://gregarious-dasik-0d8f26.netlify.app/#contact"
        target="_blank"
      >
        Contact Me
      </Button>
    </Container>
  </footer>
);

export default Footer;

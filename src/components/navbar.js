import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavBar() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"> User Details</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Add User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>

  );
}

export default NavBar;
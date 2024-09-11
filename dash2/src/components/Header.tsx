import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { RouteNames } from "../consts/routeNames";

export default function Header() {
  return (
    <Row>
      <Navbar fixed="top" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Nav className="me-auto">
            <Nav.Link href={RouteNames.HOME}>Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Row>
  );
}

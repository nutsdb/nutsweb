import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Login = () => {
  return (
    <Container>
      <Row className="justify-content-md-center form-box" lg="3">
        <div>
          <h3 className="mt-3 mt-md-5">Connect to database</h3>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Address</Form.Label>
              <Col sm="8">
                <Form.Control aria-label="host" placeholder="host" />
              </Col>
              <Col sm="4">
                <Form.Control aria-label="port" placeholder="port" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="alias">
              <Form.Label>alias</Form.Label>
              <Form.Control type="text" placeholder="alias" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Connect
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Login;

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Página no encontrada</h2>
          <p className="lead mb-4">
            La página no existe.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
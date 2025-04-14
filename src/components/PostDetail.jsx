import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ejemplo
    setTimeout(() => {
      setPost({
        id: Number(id),
        title: `Producto ${id}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
        price: 100 * Number(id),
        image: "https://dojiw2m9tvv09.cloudfront.net/68889/product/bulbasaur9210.png",
        seller: "Fugu",
        date: "17/03/2025"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="img-fluid rounded mb-4"
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">{post.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Publicado por: {post.seller} el {post.date}
              </Card.Subtitle>
              <Card.Text>{post.description}</Card.Text>
              
              <ListGroup className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Precio:</strong>
                  <span className="text-primary fw-bold">${post.price}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>ID:</strong>
                  <span>{post.id}</span>
                </ListGroup.Item>
              </ListGroup>
              
              <div className="d-grid gap-2">
                <Button variant="success" size="lg">
                  Comprar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
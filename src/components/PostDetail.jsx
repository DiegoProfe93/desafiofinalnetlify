import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { getPostById } from '../api/post';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        if (data) {
          setPost(data);
        } else {
          setError('No se pudo cargar la publicación');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Error al cargar la publicación. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
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

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          Publicación no encontrada
        </Alert>
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
                Publicado por: {post.seller?.name || 'Usuario'} el {new Date(post.createdAt).toLocaleDateString()}
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
                  Contactar vendedor
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
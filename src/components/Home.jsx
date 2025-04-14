import React, { useState, useEffect } from 'react';
import PostCard from "./Postcard";
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { getAllPosts } from '../api/posts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Productos</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {posts.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <Row>
          {posts.map(post => (
            <Col key={post.id} xs={12} md={6} lg={4} className="mb-4">
              <PostCard {...post} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
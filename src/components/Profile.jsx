import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getProfile } from '../api/auth';
import { getAllPosts } from '../api/post';
import PostCard from './PostCard';

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfile(token);
        setProfile(profileData);
        
        const posts = await getAllPosts();
        if (posts && Array.isArray(posts)) {
          const filteredPosts = posts.filter(post => 
            post.userId === profileData.id || post.sellerId === profileData.id
          );
          setUserPosts(filteredPosts);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error al cargar los datos del perfil. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

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

  if (!profile) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          No se pudo cargar el perfil. Por favor, inicie sesión nuevamente.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header as="h5">Mi Perfil</Card.Header>
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <Card.Title>{profile.name || profile.username}</Card.Title>
              <Card.Text>{profile.email}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><strong>Usuario desde:</strong> {new Date(profile.createdAt).toLocaleDateString()}</ListGroup.Item>
              <ListGroup.Item><strong>Productos publicados:</strong> {userPosts.length}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">Editar Perfil</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Mis Publicaciones</Card.Header>
            <Card.Body>
              {userPosts.length === 0 ? (
                <div className="text-center p-5">
                  <p>No has publicado ningún producto</p>
                  <Button variant="primary" href="/create">Crear mi primera publicación</Button>
                </div>
              ) : (
                <Row xs={1} md={2} className="g-4">
                  {userPosts.map(post => (
                    <Col key={post.id}>
                      <PostCard
                        id={post.id}
                        title={post.title}
                        description={post.description}
                        price={post.price}
                        image={post.image}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Alert, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getProfile } from '../api/auth';
import { getAllPosts } from '../api/post';
import { uploadFile } from '../api/post';
import PostCard from './Postcard';

export default function Profile() {
  const { user, token, login } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showEditModal, setShowEditModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    username: '',
    email: '',
    avatar: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfile(token);
        setProfile(profileData);
        setProfileForm({
          name: profileData.name || '',
          username: profileData.username || '',
          email: profileData.email || '',
          avatar: profileData.avatar || ''
        });
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

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setUpdateError('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError('');
    
    try {
      let avatarUrl = profileForm.avatar;
      
      if (profileImage) {
        const uploadResponse = await uploadFile(profileImage, token);
        if (uploadResponse.url) {
          avatarUrl = uploadResponse.url;
        } else {
          throw new Error('Error uploading profile image');
        }
      }
      const updateData = {
        ...profileForm,
        avatar: avatarUrl
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProfile({
          ...profile,
          ...updateData
        });

        if (login && data.token) {
          login(data.user, data.token);}
        
        handleCloseModal();
      } else {
        throw new Error(data.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setUpdateError(err.message || 'Error al actualizar el perfil. Por favor, intente de nuevo.');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {

      const date = new Date(dateString);

      if (isNaN(date.getTime())) return 'Fecha no disponible';

      return date.toLocaleDateString();
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Fecha no disponible';
    }
  };

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
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <Card.Title>{profile.name || profile.username}</Card.Title>
              <Card.Text>{profile.email}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <strong>Usuario desde:</strong> {formatDate(profile.createdAt)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Productos publicados:</strong> {userPosts.length}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" onClick={handleEditProfile}>
                  Editar Perfil
                </Button>
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

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateError && <Alert variant="danger">{updateError}</Alert>}
          
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleFormChange}
                placeholder="Tu nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileForm.username}
                onChange={handleFormChange}
                placeholder="Nombre de usuario"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleFormChange}
                placeholder="Tu email"
                disabled
              />
              <Form.Text className="text-muted">
                El email no se puede cambiar
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAvatar">
              <Form.Label>Imagen de perfil</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Form.Text className="text-muted">
                Sube una nueva imagen de perfil o deja vacío para mantener la actual
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAvatarUrl">
              <Form.Label>URL de imagen de perfil (opcional)</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={profileForm.avatar}
                onChange={handleFormChange}
                placeholder="URL de tu imagen de perfil"
              />
              <Form.Text className="text-muted">
                URL de imagen
              </Form.Text>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={updating}>
                {updating ? 'Actualizando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
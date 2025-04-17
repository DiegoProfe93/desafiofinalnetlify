import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createPost, uploadFile } from '../api/post'; 
import { AuthContext } from '../context/AuthContext';

export default function CreatePost() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let imageUrl = postData.image;
      
      if (imageFile) {
        const uploadResponse = await uploadFile(imageFile, token);
        if (uploadResponse.url) {
          imageUrl = uploadResponse.url;
        } else {
          throw new Error('Error uploading image');
        }
      }
      const finalPostData = {
        ...postData,
        price: Number(postData.price),
        image: imageUrl
      };
      
      const response = await createPost(finalPostData, token);
      
      if (response.id) {
        navigate(`/post/${response.id}`);
      } else {
        throw new Error(response.message || 'Error creating post');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message || 'Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h4" className="text-center">Publica tu producto</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="title"
                    placeholder="Nombre del producto" 
                    value={postData.title}
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="description"
                    placeholder="Descripción del producto" 
                    value={postData.description}
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="price"
                    placeholder="Precio del producto" 
                    value={postData.price}
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Imagen del producto</Form.Label>
                  <Form.Control 
                    type="file" 
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    Ingresa una URL de imagen
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formImageUrl">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="image"
                    placeholder="URL de la imagen del producto" 
                    value={postData.image}
                    onChange={handleChange} 
                  />
                </Form.Group>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Publicando...' : 'Publicar Anuncio'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
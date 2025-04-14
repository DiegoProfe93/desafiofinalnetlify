import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h4" className="text-center">Publica tu producto</Card.Header>
            <Card.Body>
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
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="image"
                    placeholder="URL de la imagen del producto" 
                    value={postData.image}
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>
                
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Publicar Anuncio
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

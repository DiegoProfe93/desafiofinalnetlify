import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Tab, Nav } from 'react-bootstrap';

export default function Profile() {
  // ejemplo
  const userData = {
    name: "Fugu",
    email: "fugu@fugumarket.com",
    joined: "17 de Marzo 2025",
    posts: [
      { id: 1, title: "MODEL KIT ENTRY GRADE SUPER SAIYAN GOD VEGETA", price: 15990, status: "active" },
      { id: 2, title: "POKEMON MODEL KIT QUICK BULBASAUR", price: 9990, status: "active" },
    ]
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src="https://img.freepik.com/premium-vector/cute-fugu-puffer-fish-cartoon-character-premium-vector-graphics-stickers-style_324746-1016.jpg"
                  alt="Foto de perfil"
                  className="rounded-circle"
                  width="150"
                  height="150"
                />
              </div>
              <Card.Title as="h4">{userData.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Miembro desde {userData.joined}
              </Card.Subtitle>
              <Button variant="outline-primary" className="mt-3">
                Editar Perfil
              </Button>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <strong>Email:</strong> {userData.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Productos publicados:</strong> {userData.posts.length}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Tab.Container id="profile-tabs" defaultActiveKey="posts">
            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="posts">Mis Anuncios</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="posts">
                    <h5 className="mb-3">Tus Anuncios Publicados</h5>
                    <ListGroup>
                      {userData.posts.map(post => (
                        <ListGroup.Item key={post.id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{post.title}</strong>
                            <p className="mb-0">${post.price}</p>
                          </div>
                          <div>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              Editar
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              Eliminar
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}
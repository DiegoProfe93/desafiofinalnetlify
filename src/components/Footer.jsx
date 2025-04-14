import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Contáctanos</h5>
            <div className="mt-3">
              <p className="mb-0">info@fugumarket.com</p>
              <p className="mb-0">+56 123456789</p>
            </div>
          </Col>
          
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Nosotros</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-white text-decoration-none">Preguntas frecuentes</Link></li>
              <li><Link to="#" className="text-white text-decoration-none">Términos y condiciones</Link></li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h5>Síguenos</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>

          </Col>
        </Row>
        
        <hr className="my-3 bg-white" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">© FuguMarket. Desafio Latam 2025.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
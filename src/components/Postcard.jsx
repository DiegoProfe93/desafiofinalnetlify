import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostCard = ({ id, title, description, price, image }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="fw-bold">${price}</Card.Text>
        <Button as={Link} to={`/post/${id}`} variant="primary">Ver detalles</Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';

export default function CardContent({ card, deleteCardHandler }) {
  const { deckId } = useParams();

  return (
    // Card content format
    <Card>
      <Card.Body>
        <Container style={{ margin: '0 0 2rem' }}>
          <Row>
            <Col>{card.front}</Col>
            <Col>{card.back}</Col>
          </Row>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ display: 'flex' }}>
            {/* Button to edit a card */}
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <Button variant='secondary' style={{ marginRight: '0.5rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <CiEdit style={{ marginRight: '0.5rem' }} />
                  Edit
                </span>
              </Button>
            </Link>
            {/* Button to delete a card */}
            <Button onClick={() => deleteCardHandler(card.id)} variant='danger'>
              <BsTrash />
            </Button>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

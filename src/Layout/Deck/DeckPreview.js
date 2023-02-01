import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaRegEye } from 'react-icons/fa';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

export default function DeckPreview({ deck, deleteDeckHandler }) {
  return (
    <Card>
      <Card.Body>
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>{deck.name}</h3>
            <h6>{deck.cards?.length} cards</h6>
          </div>
          <p>{deck.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex' }}>
              <div>
                {/* Button to view deck */}
                <Link to={`/decks/${deck.id}`}>
                  <Button variant='secondary' style={{ marginRight: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <FaRegEye style={{ marginRight: '0.5rem' }} />
                      View
                    </span>
                  </Button>
                </Link>
              </div>
              <div>
                {/* Button to study deck */}
                <Link to={`/decks/${deck.id}/study`}>
                  <Button variant='primary' style={{ marginRight: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <BsFillJournalBookmarkFill
                        style={{ marginRight: '0.5rem' }}
                      />
                      Study
                    </span>
                  </Button>
                </Link>
              </div>
            </span>
            <div>
              {/* Button to delete deck */}
              <Button
                onClick={() => deleteDeckHandler(deck.id)}
                variant='danger'
              >
                <BsTrash />
              </Button>
            </div>
          </div>
        </Container>
      </Card.Body>
    </Card>
  );
}

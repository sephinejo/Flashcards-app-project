import React from 'react';
import Decks from '../Deck/Decks';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ImPlus } from 'react-icons/im';

export default function Home({ decks, deleteDeckHandler }) {
  return (
    <div>
      {/* Button to create new deck */}
      <Link to='/decks/new'>
        <Button variant='secondary' style={{ marginBottom: '0.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <ImPlus style={{ marginRight: '0.5rem' }} />
            Create Deck
          </span>
        </Button>
      </Link>
      {/* Mapping through decks */}
      <Decks decks={decks} deleteDeckHandler={deleteDeckHandler} />
    </div>
  );
}

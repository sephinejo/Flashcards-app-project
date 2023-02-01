import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import Button from 'react-bootstrap/Button';
import { CiEdit } from 'react-icons/ci';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { ImPlus } from 'react-icons/im';
import { BsTrash } from 'react-icons/bs';
import Cards from '../Card/Cards';

export default function Deck({ deleteDeckHandler }) {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  return (
    <div>
      <Breadcrumbs current='React Router' />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex' }}>
          <div>
            <Link to={`/decks/${deckId}/edit`}>
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
          </div>
          <div>
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
          <div>
            <Link to={`/decks/${deckId}/cards/new`}>
              <Button variant='primary' style={{ marginBottom: '0.5rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <ImPlus style={{ marginRight: '0.5rem' }} />
                  Add Card
                </span>
              </Button>
            </Link>
          </div>
        </span>
        <div>
          <Button onClick={() => deleteDeckHandler(deckId)} variant='danger'>
            <BsTrash />
          </Button>
        </div>
      </div>
      <Cards deck={deck} />
    </div>
  );
}

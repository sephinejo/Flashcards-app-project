import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function EditDeck() {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    async function updateDeckData() {
      await updateDeck(deck);
      history.push(`/decks/${deckId}`);
    }
    updateDeckData();
  };

  return (
    <>
      <Breadcrumbs
        prev={deck.name}
        link={`/decks/${deckId}`}
        current='Edit Deck'
      />
      <h1 style={{ marginBottom: '1rem' }}>Edit Deck</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            id='name'
            name='name'
            type='text'
            value={deck.name}
            onChange={changeHandler}
            placeholder={deck.name}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            id='description'
            name='description'
            as='textarea'
            style={{ height: '7rem' }}
            value={deck.description}
            onChange={changeHandler}
            placeholder={deck.description}
            required
          />
          <div style={{ marginTop: '0.8rem' }}>
            <Button
              variant='secondary'
              style={{ marginRight: '0.5rem' }}
              onClick={() => history.push('/')}
            >
              Cancel
            </Button>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

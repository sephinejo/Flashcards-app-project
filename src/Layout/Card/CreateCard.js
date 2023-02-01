import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateCard() {
  const history = useHistory();
  const { deckId } = useParams();

  const initialCardForm = {
    id: 0,
    front: '',
    back: '',
    deckId: deckId,
  };

  // Store new card data with useState
  const [formData, setFormData] = useState({ ...initialCardForm });
  const [deck, setDeck] = useState({});

  // Handle entered card data
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Handle submitted card data
  const submitHandler = (e) => {
    e.preventDefault();

    async function cardCreate() {
      try {
        await createCard(deckId, formData);
        setFormData({ ...initialCardForm });
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    cardCreate();
    history.push(`/decks/${deckId}`);
  };

  // Read deck corresponding new card
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(() => loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  return (
    <div>
      <Breadcrumbs
        prev={deck.name}
        link={`/decks/${deckId}`}
        current='Add Card'
      />
      <h1>{deck.name}: Add Card</h1>
      {/* Form to create new card */}
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Front</Form.Label>
          <Form.Control
            id='front'
            name='front'
            as='textarea'
            value={formData.front}
            onChange={changeHandler}
            placeholder='Front side of card'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Back</Form.Label>
          <Form.Control
            id='back'
            name='back'
            as='textarea'
            value={formData.back}
            onChange={changeHandler}
            placeholder='Back side of card'
            required
          />
        </Form.Group>
      </Form>
      <div style={{ marginTop: '0.8rem' }}>
        {/* Button to submit */}
        <Button
          variant='secondary'
          style={{ marginRight: '0.5rem' }}
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </Button>
        {/* Button to save */}
        <Button variant='primary' type='submit' onClick={submitHandler}>
          Save
        </Button>
      </div>
    </div>
  );
}

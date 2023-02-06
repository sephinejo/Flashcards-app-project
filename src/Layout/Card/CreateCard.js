import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import CardForm from './CardForm';
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
      <CardForm
        onChange={changeHandler}
        onSubmit={submitHandler}
        formData={formData}
      />
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
  );
}

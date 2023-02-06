import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import CardForm from './CardForm';
import Button from 'react-bootstrap/Button';

export default function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();

  // Read corresponding deck and card
  useEffect(() => {
    const loadDeck = async () => setDeck(await readDeck(deckId));
    loadDeck();
    const loadCard = async () => setCard(await readCard(cardId));
    loadCard();
  }, [deckId, cardId]);

  // Handle entered card data
  const changeHandler = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  // Handle submitted card data and update with it
  const submitHandler = (e) => {
    e.preventDefault();

    async function updateCardData() {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    }

    updateCardData();
  };

  return (
    <div>
      <Breadcrumbs prev={`Deck ${deck.name}`} current={`Edit Card ${cardId}`} />
      <h1 style={{ marginBottom: '1rem' }}>Edit Card</h1>
      {/* Form to edit card */}
      <CardForm
        onChange={changeHandler}
        onSubmit={submitHandler}
        formData={card}
      />
      <div style={{ marginTop: '0.8rem' }}>
        {/* Button to cancel */}
        <Button
          variant='secondary'
          style={{ marginRight: '0.5rem' }}
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Cancel
        </Button>
        {/* Button to submit */}
        <Button variant='primary' type='submit' onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  );
}

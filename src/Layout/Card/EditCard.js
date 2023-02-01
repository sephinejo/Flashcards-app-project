import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import Form from 'react-bootstrap/Form';
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
    <>
      <Breadcrumbs prev={`Deck ${deck.name}`} current={`Edit Card ${cardId}`} />
      <h1 style={{ marginBottom: '1rem' }}>Edit Card</h1>
      {/* Form to edit card */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Front</Form.Label>
          <Form.Control
            id='front'
            name='front'
            as='textarea'
            value={card.front}
            onChange={changeHandler}
            placeholder={card.front}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Back</Form.Label>
          <Form.Control
            id='back'
            name='back'
            as='textarea'
            style={{ height: '7rem' }}
            value={card.back}
            onChange={changeHandler}
            placeholder={card.back}
            required
          />
          <div style={{ marginTop: '0.8rem' }}>
            {/* Button to cancel */}
            <Button
              variant='secondary'
              style={{ marginRight: '0.5rem' }}
              onClick={() => history.push('/')}
            >
              Cancel
            </Button>
            {/* Button to submit */}
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

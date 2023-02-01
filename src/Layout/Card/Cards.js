import React from 'react';
import { deleteCard } from '../../utils/api';
import CardContent from './CardContent';

export default function Cards({ deck }) {
  // Handle to delete a card
  const deleteCardHandler = (indexToDelete) => {
    const message = `
    Delete this card?

    You will not be able to recover it.
    `;

    if (window.confirm(message)) {
      deleteCard(indexToDelete);
      window.location.reload();
    }
  };

  return (
    <>
      <h2 style={{ margin: '1.5rem 0 0.5rem' }}>Cards</h2>
      {/* Mapping through card content */}
      {deck.cards?.map((card) => (
        <CardContent card={card} deleteCardHandler={deleteCardHandler} />
      ))}
    </>
  );
}

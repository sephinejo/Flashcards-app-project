import React from 'react';
import DeckPreview from './DeckPreview';

export default function Decks({ decks, deleteDeckHandler }) {
  // Mapping through preview of decks
  return (
    <div>
      {decks.map((deck) => (
        <DeckPreview
          key={deck.id}
          deck={deck}
          deleteDeckHandler={deleteDeckHandler}
        />
      ))}
    </div>
  );
}

import React from 'react';
import DeckPreview from './DeckPreview';

export default function Decks({ decks, deleteDeckHandler }) {
  // Mapping through preview of decks
  return (
    <div>
      {decks.map((deck, index) => (
        <DeckPreview
          deck={deck}
          deleteDeckHandler={deleteDeckHandler}
          index={index}
        />
      ))}
    </div>
  );
}

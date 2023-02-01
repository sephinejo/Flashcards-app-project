import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import StudyCard from '../Card/StudyCard';

export default function StudyDeck() {
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
      <Breadcrumbs prev={deck.name} link={`/decks/${deckId}`} current='Study' />
      <h1>Study: {deck.name}</h1>
      <StudyCard cards={deck.cards} />
    </div>
  );
}

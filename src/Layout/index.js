import React, { useState, useEffect } from 'react';
import Header from './Common/Header';
import Home from './Common/Home';
import NotFound from './Common/NotFound';
import { Switch, Route } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api';
import Deck from './Deck/Deck';
import StudyDeck from './Deck/StudyDeck';
import CreateCard from './Card/CreateCard';
import CreateDeck from './Deck/CreateDeck';
import StudyCard from './Card/StudyCard';
import EditCard from './Card/EditCard';
import EditDeck from './Deck/EditDeck';

function Layout() {
  const [decks, setDecks] = useState([]);

  // Handle deleting a deck
  const deleteDeckHandler = async (indexToDelete) => {
    const message = `
    Delete this deck?

    You will not be able to recover it.
    `;

    if (window.confirm(message)) {
      await deleteDeck(indexToDelete);
    }
    window.location.reload();
  };

  // Load decks
  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const loadedDecks = await listDecks();
        setDecks(loadedDecks);
      } catch (error) {
        if (error.name === 'AbortError') {
        } else {
          throw error;
        }
      }
    }
    loadDecks();

    return () => abortController.abort();
  }, []);

  // Handle adding new deck
  const addDeckHandler = (newDeckData) => {
    setDecks([...decks, newDeckData]);
  };

  return (
    <>
      <Header />
      <div className='container'>
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path='/'>
            <Home decks={decks} deleteDeckHandler={deleteDeckHandler} />
          </Route>
          <Route path={'/decks/new'}>
            <CreateDeck addDeckHandler={addDeckHandler} />
          </Route>
          <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard />
          </Route>
          <Route path={`/decks/:deckId/cards/:cardId/study`}>
            <StudyCard />
          </Route>
          <Route path={`/decks/:deckId/cards/new`}>
            <CreateCard />
          </Route>
          <Route path={`/decks/:deckId/study`}>
            <StudyDeck />
          </Route>
          <Route path={`/decks/:deckId/edit`}>
            <EditDeck />
          </Route>
          <Route exact path={`/decks/:deckId`}>
            <Deck deleteDeckHandler={deleteDeckHandler} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

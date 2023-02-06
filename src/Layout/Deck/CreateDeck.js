import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateDeck() {
  // Store new deck data with useState
  const [formData, setFormData] = useState({ name: '', description: '' });
  const history = useHistory();

  // Handle entered data
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Handle submitted deck data and create new deck with it
  const submitHandler = (e) => {
    e.preventDefault();

    async function deckCreate() {
      try {
        await createDeck(formData);
        setFormData({ name: '', description: '' });
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    deckCreate();
    history.push('/');
    window.location.reload();
  };

  return (
    <>
      <Breadcrumbs current='Create Deck' />
      <h1 style={{ marginBottom: '1rem' }}>Create Deck</h1>
      {/* Form to create new deck */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={changeHandler}
            placeholder='Deck Name'
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
            value={formData.description}
            onChange={changeHandler}
            placeholder='Brief description of the deck'
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
            <Button variant='primary' type='submit' onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

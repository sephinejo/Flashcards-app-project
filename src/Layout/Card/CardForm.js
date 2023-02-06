import React from 'react';
import Form from 'react-bootstrap/Form';

export default function CardForm(props) {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Front</Form.Label>
        <Form.Control
          id='front'
          name='front'
          as='textarea'
          value={props.formData.front}
          onChange={props.onChange}
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
          style={{ height: '7rem' }}
          value={props.formData.back}
          onChange={props.onChange}
          placeholder='Back side of card'
          required
        />
      </Form.Group>
    </Form>
  );
}

import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { AiFillHome } from 'react-icons/ai';

export default function Breadcrumbs({ link, prev, current }) {
  return (
    <Breadcrumb>
      {/* breadcrumb to go home */}
      <Breadcrumb.Item href='/'>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <AiFillHome style={{ marginRight: '0.3rem' }} />
          Home
        </span>
      </Breadcrumb.Item>
      {/* If previous page exists apply breadcrumb to go to it, and show the current breadcrumb */}
      {!prev ? (
        <Breadcrumb.Item active>{current}</Breadcrumb.Item>
      ) : (
        <>
          <Breadcrumb.Item href={link}>{prev}</Breadcrumb.Item>
          <Breadcrumb.Item active>{current}</Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
}

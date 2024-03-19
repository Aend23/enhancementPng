import React from 'react';

function Success({ firstName, lastName, email, fact }) {
  return (
    <div >
      <p className='title'>Congratulations, your info is registered.</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Here's a fact for you:</p>
      <p className='fact'>{fact}</p>
    </div>
  );
}

export default Success;

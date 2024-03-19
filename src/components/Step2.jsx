import React from 'react';

function Step2({ firstName, lastName, email, handleFirstNameInputChange, handleLastNameInputChange, handleEmailInputChange }) {
  return (
    <div className='tab2'>
      <div className='name'>
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameInputChange}
          placeholder="First Name"
          className='inputs'
          maxLength="35"
          pattern="^[A-Za-z\s]+$"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameInputChange}
          placeholder="Last Name"
          className='inputs'
          maxLength="35"
          pattern="^[A-Za-z\s]+$"
          required
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailInputChange}
          placeholder="Email Address"
          className='inputs'
          required
        />
      </div>
    </div>
  );
}

export default Step2;

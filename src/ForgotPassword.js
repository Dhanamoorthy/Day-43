import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      if (response.status === 200) {
        setResetLinkSent(true);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      {!resetLinkSent ? (
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
          <button type="submit">Submit</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      ) : (
        <p>Reset link sent. Please check your email.</p>
      )}
    </div>
  );
};

export default ForgotPassword;

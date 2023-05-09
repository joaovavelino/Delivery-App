import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RegisterBtn({ testid }) {
  const navigate = useHistory();

  function handleClick() {
    navigate.push('/register');
  }

  return (
    <button
      data-testid={ testid }
      className="register-btn"
      type="button"
      onClick={ () => handleClick() }
    >
      Sign in
    </button>
  );
}

RegisterBtn.propTypes = {
  testid: PropTypes.string,
}.isRequired;

export default RegisterBtn;

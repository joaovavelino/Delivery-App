import React from 'react';
import PropTypes from 'prop-types';

function Select({ onChange, value, key, testid, name }) {
  return (
    <select
      data-testid={ testid }
      onChange={ onChange }
    >

      <option
        value={ value }
        key={ key }
      >
        { name }
      </option>

    </select>
  );
}

Select.propTypes = {
  onChange: PropTypes.shape({}),
  value: PropTypes.string,
  key: PropTypes.string,
  testid: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default Select;

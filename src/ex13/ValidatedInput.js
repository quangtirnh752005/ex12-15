import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ValidatedInput({ label, validationFunction, errorMessage }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div className="stack">
      <label className="stack">
        <span>{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={isValid ? '' : 'error'}
          aria-invalid={!isValid}
        />
      </label>
      {!isValid && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

ValidatedInput.propTypes = {
  label: PropTypes.string.isRequired,
  validationFunction: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ONE_SECOND = 1000;

export default function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, ONE_SECOND);

    return () => {
      clearInterval(timerId);
    };
  }, [timeRemaining]);

  return (
    <p className="big">
      Time Remaining: {timeRemaining}
      {timeRemaining === 0 && <span className="badge">Done</span>}
    </p>
  );
}

CountdownTimer.propTypes = {
  initialValue: PropTypes.number.isRequired,
};

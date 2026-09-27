import { useState } from 'react';

export default function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="stack">
      <button onClick={() => setIsVisible((prev) => !prev)}>{isVisible ? 'Hide' : 'Show'}</button>
      {isVisible && <p>Toggle me! This text is now visible.</p>}
    </div>
  );
}

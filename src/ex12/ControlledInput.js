import { useState } from 'react';

export default function ControlledInput() {
  const [text, setText] = useState('');

  return (
    <div className="stack">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Controlled input"
      />
      <p>
        You typed: <strong data-testid="typed-text">{text}</strong>
      </p>
    </div>
  );
}

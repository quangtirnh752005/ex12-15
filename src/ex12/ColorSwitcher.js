import { useState } from 'react';

const COLORS = ['Red', 'Blue', 'Green', 'Yellow'];

export default function ColorSwitcher() {
  const [color, setColor] = useState('');

  return (
    <div className="stack">
      <select value={color} onChange={(e) => setColor(e.target.value)} aria-label="Color">
        <option value="">Select a color</option>
        {COLORS.map((c) => (
          <option key={c} value={c.toLowerCase()}>
            {c}
          </option>
        ))}
      </select>
      <div className="color-box" data-testid="color-box" style={{ backgroundColor: color || 'transparent' }}>
        {color ? `Background: ${color}` : 'No color selected'}
      </div>
    </div>
  );
}

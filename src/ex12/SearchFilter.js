import { useState } from 'react';

const ITEMS = ['Apple', 'Banana', 'Cherry', 'Durian', 'Grape', 'Mango', 'Orange', 'Pineapple', 'Watermelon'];

export default function SearchFilter() {
  const [query, setQuery] = useState('');

  const filteredItems = ITEMS.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="stack">
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search"
      />
      {filteredItems.length === 0 ? (
        <p className="muted">No items match "{query}".</p>
      ) : (
        <ul className="list">
          {filteredItems.map((item) => (
            <li key={item} className="list-item">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

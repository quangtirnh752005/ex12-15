import { useState } from 'react';

export const moveItem = (list, fromIndex, toIndex) => {
  const copy = [...list];
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);
  return copy;
};

export default function DragDropList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggingItem(index);
  };

  // Reorder live while hovering so the user sees where the item will land.
  const handleDragEnter = (index) => {
    if (draggingItem === null || draggingItem === index) return;
    setItems((prev) => moveItem(prev, draggingItem, index));
    setDraggingItem(index);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li
          key={item}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={handleDragEnd}
          className={`list-item draggable ${draggingItem === index ? 'dragging' : ''}`}
        >
          <span className="grip" aria-hidden="true">
            ⋮⋮
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

import { useState } from 'react';

let nextId = 1;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    setTodos((prev) => [...prev, { id: nextId++, title }]);
    setNewTodo('');
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="stack">
      <form className="row" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          aria-label="New todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.length === 0 ? (
        <p className="muted">No todos yet.</p>
      ) : (
        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id} className="list-item">
              <span>{todo.title}</span>
              <button className="danger small" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

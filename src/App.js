import { useEffect, useState } from 'react';
import Exercise12 from './ex12/Exercise12';
import Exercise13 from './ex13/Exercise13';
import Exercise14 from './ex14/Exercise14';
import Exercise15 from './ex15/Exercise15';

const EXERCISES = [
  { id: '12', hook: 'useState', Component: Exercise12 },
  { id: '13', hook: 'useEffect', Component: Exercise13 },
  { id: '14', hook: 'useContext', Component: Exercise14 },
  { id: '15', hook: 'useReducer', Component: Exercise15 },
];

const readHash = () => {
  const id = window.location.hash.replace('#ex', '');
  return EXERCISES.some((ex) => ex.id === id) ? id : EXERCISES[0].id;
};

export default function App() {
  const [activeId, setActiveId] = useState(readHash);

  useEffect(() => {
    const onHashChange = () => setActiveId(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const active = EXERCISES.find((ex) => ex.id === activeId);
  const ActiveExercise = active.Component;

  return (
    <div className="app">
      <header className="topbar">
        <h1>
          FER202 <span className="muted">· React Hooks</span>
        </h1>
        <nav className="tabs" aria-label="Exercises">
          {EXERCISES.map((ex) => (
            <a
              key={ex.id}
              href={`#ex${ex.id}`}
              className={ex.id === activeId ? 'tab active' : 'tab'}
              aria-current={ex.id === activeId ? 'page' : undefined}
            >
              Bài {ex.id} <code>{ex.hook}</code>
            </a>
          ))}
        </nav>
      </header>

      <main className="content">
        <h2>
          Exercise {active.id}: React Hook ({active.hook})
        </h2>
        <ActiveExercise />
      </main>
    </div>
  );
}

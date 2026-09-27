import { useReducer } from 'react';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export function counterReducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
}

export default function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div className="stack center">
      <p className="big">Count: {count}</p>
      <div className="row">
        <button onClick={() => dispatch({ type: DECREMENT })} aria-label="Decrement">
          -
        </button>
        <button onClick={() => dispatch({ type: INCREMENT })} aria-label="Increment">
          +
        </button>
        <button className="secondary" onClick={() => dispatch({ type: RESET })}>
          Reset
        </button>
      </div>
    </div>
  );
}

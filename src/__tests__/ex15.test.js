import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter, { counterReducer, INCREMENT, DECREMENT, RESET } from '../ex15/Counter';
import QuestionBank, { quizReducer, initialState } from '../ex15/QuestionBank';

describe('Exercise 15 – useReducer', () => {
  test('counterReducer handles INCREMENT, DECREMENT, RESET and unknown actions', () => {
    expect(counterReducer(0, { type: INCREMENT })).toBe(1);
    expect(counterReducer(0, { type: DECREMENT })).toBe(-1);
    expect(counterReducer(7, { type: RESET })).toBe(0);
    expect(counterReducer(7, { type: 'UNKNOWN' })).toBe(7);
  });

  test('Counter component dispatches actions', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
    await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
    await userEvent.click(screen.getByRole('button', { name: 'Decrement' }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('quizReducer scores answers and shows score after the last question', () => {
    let state = initialState;
    state = quizReducer(state, { type: 'NEXT_QUESTION' });
    expect(state).toBe(initialState); // cannot skip without selecting

    for (const q of initialState.questions) {
      state = quizReducer(state, { type: 'SELECT_OPTION', payload: q.answer });
      state = quizReducer(state, { type: 'NEXT_QUESTION' });
    }
    expect(state.showScore).toBe(true);
    expect(state.score).toBe(initialState.questions.length);

    state = quizReducer(state, { type: 'RESTART_QUIZ' });
    expect(state).toEqual(initialState);
  });

  test('quizReducer does not add score for a wrong answer', () => {
    let state = quizReducer(initialState, { type: 'SELECT_OPTION', payload: 'Sydney' });
    state = quizReducer(state, { type: 'NEXT_QUESTION' });
    expect(state.score).toBe(0);
    expect(state.currentQuestion).toBe(1);
    expect(state.selectedOption).toBe('');
  });

  test('QuestionBank full flow: Next disabled until an option is selected, then score & restart', async () => {
    render(<QuestionBank />);

    for (const [index, q] of initialState.questions.entries()) {
      const isLast = index === initialState.questions.length - 1;
      const nextButton = screen.getByRole('button', { name: isLast ? 'Finish' : 'Next' });
      expect(nextButton).toBeDisabled();
      // Answer the first question wrong, the rest right.
      const choice = index === 0 ? 'Sydney' : q.answer;
      await userEvent.click(screen.getByRole('button', { name: choice }));
      await userEvent.click(nextButton);
    }

    const total = initialState.questions.length;
    expect(screen.getByText(`Your Score: ${total - 1}/${total}`)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /restart quiz/i }));
    expect(screen.getByText('What is the capital of Australia?')).toBeInTheDocument();
  });
});

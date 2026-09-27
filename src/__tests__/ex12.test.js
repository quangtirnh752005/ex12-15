import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../ex12/Counter';
import ControlledInput from '../ex12/ControlledInput';
import ToggleVisibility from '../ex12/ToggleVisibility';
import TodoList from '../ex12/TodoList';
import ColorSwitcher from '../ex12/ColorSwitcher';
import SearchFilter from '../ex12/SearchFilter';
import DragDropList, { moveItem } from '../ex12/DragDropList';

describe('Exercise 12 – useState', () => {
  test('Counter increments by 1 on each click', async () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });

  test('ControlledInput shows typed text in real time', async () => {
    render(<ControlledInput />);
    await userEvent.type(screen.getByLabelText(/controlled input/i), 'Hello');
    expect(screen.getByTestId('typed-text')).toHaveTextContent('Hello');
  });

  test('ToggleVisibility starts hidden and toggles Show/Hide', async () => {
    render(<ToggleVisibility />);
    expect(screen.queryByText(/toggle me/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));
    expect(screen.getByText(/toggle me/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Hide' }));
    expect(screen.queryByText(/toggle me/i)).not.toBeInTheDocument();
  });

  test('TodoList adds, ignores blank input, and deletes items', async () => {
    render(<TodoList />);
    const input = screen.getByLabelText(/new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    await userEvent.click(addButton);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();

    await userEvent.type(input, 'Learn useState');
    await userEvent.click(addButton);
    await userEvent.type(input, 'Learn useEffect{enter}');

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(input).toHaveValue('');

    await userEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(screen.queryByText('Learn useState')).not.toBeInTheDocument();
    expect(screen.getByText('Learn useEffect')).toBeInTheDocument();
  });

  test('ColorSwitcher changes the div background', async () => {
    render(<ColorSwitcher />);
    await userEvent.selectOptions(screen.getByLabelText(/color/i), 'blue');
    expect(screen.getByTestId('color-box')).toHaveStyle({ backgroundColor: 'blue' });
  });

  test('SearchFilter filters case-insensitively', async () => {
    render(<SearchFilter />);
    await userEvent.type(screen.getByLabelText(/search/i), 'AN');
    const items = screen.getAllByRole('listitem').map((li) => li.textContent);
    expect(items).toEqual(['Banana', 'Durian', 'Mango', 'Orange']);
  });

  test('moveItem returns a reordered copy without mutating the input', () => {
    const original = ['a', 'b', 'c', 'd'];
    expect(moveItem(original, 0, 2)).toEqual(['b', 'c', 'a', 'd']);
    expect(original).toEqual(['a', 'b', 'c', 'd']);
  });

  test('DragDropList reorders items on drag', () => {
    render(<DragDropList />);
    const [first, , third] = screen.getAllByRole('listitem');
    fireEvent.dragStart(first);
    fireEvent.dragEnter(third);
    fireEvent.dragEnd(third);
    const order = screen.getAllByRole('listitem').map((li) => li.textContent.replace('⋮⋮', ''));
    expect(order).toEqual(['Item 2', 'Item 3', 'Item 1', 'Item 4', 'Item 5']);
  });
});

import { render, screen, act, fireEvent } from '@testing-library/react';
import UserPosts from '../ex13/UserPosts';
import CountdownTimer from '../ex13/CountdownTimer';
import WindowSize from '../ex13/WindowSize';
import ValidatedInput from '../ex13/ValidatedInput';

const okResponse = (data) => ({ ok: true, json: () => Promise.resolve(data) });

describe('Exercise 13 – useEffect', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
    jest.useRealTimers();
  });

  test('UserPosts fetches posts for userId and refetches when it changes', async () => {
    const fetchMock = jest.fn().mockResolvedValue(okResponse([{ id: 1, title: 'Post of user 1', body: 'body' }]));
    global.fetch = fetchMock;

    const { rerender } = render(<UserPosts userId={1} />);
    expect(await screen.findByText('Post of user 1')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://jsonplaceholder.typicode.com/posts?userId=1',
      expect.any(Object)
    );

    fetchMock.mockResolvedValue(okResponse([{ id: 11, title: 'Post of user 2', body: 'b' }]));
    rerender(<UserPosts userId={2} />);
    expect(await screen.findByText('Post of user 2')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://jsonplaceholder.typicode.com/posts?userId=2',
      expect.any(Object)
    );
  });

  test('UserPosts shows an error message when the request fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    render(<UserPosts userId={1} />);
    expect(await screen.findByText(/HTTP 500/)).toBeInTheDocument();
  });

  test('CountdownTimer counts down every second and stops at 0', () => {
    jest.useFakeTimers();
    render(<CountdownTimer initialValue={3} />);
    expect(screen.getByText(/Time Remaining: 3/)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText(/Time Remaining: 2/)).toBeInTheDocument();

    for (let i = 0; i < 5; i += 1) {
      act(() => jest.advanceTimersByTime(1000));
    }
    expect(screen.getByText(/Time Remaining: 0/)).toBeInTheDocument();
  });

  test('CountdownTimer clears its interval on unmount', () => {
    jest.useFakeTimers();
    const clearSpy = jest.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<CountdownTimer initialValue={5} />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });

  test('WindowSize updates on resize and removes listener on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<WindowSize />);

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByText('Window size: 800 x 600')).toBeInTheDocument();

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('ValidatedInput shows error only while the value is invalid', () => {
    const isNumber = (v) => /^\d*$/.test(v);
    render(<ValidatedInput label="Age" validationFunction={isNumber} errorMessage="Numbers only" />);
    const input = screen.getByLabelText('Age');

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByText('Numbers only')).toBeInTheDocument();
    expect(input).toHaveClass('error');

    fireEvent.change(input, { target: { value: '20' } });
    expect(screen.queryByText('Numbers only')).not.toBeInTheDocument();
  });
});

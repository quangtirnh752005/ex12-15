import { useState } from 'react';
import Section from '../components/Section';
import UserPosts from './UserPosts';
import CountdownTimer from './CountdownTimer';
import WindowSize from './WindowSize';
import ValidatedInput from './ValidatedInput';

const USER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const COUNTDOWN_START = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Declared outside the component so its identity is stable and the effect in ValidatedInput
// only re-runs when the value actually changes.
const isValidEmail = (value) => value === '' || EMAIL_PATTERN.test(value);

export default function Exercise13() {
  const [userId, setUserId] = useState(1);
  const [timerKey, setTimerKey] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [showWindowSize, setShowWindowSize] = useState(true);

  return (
    <div className="grid">
      <Section
        index={1}
        title="Data Fetching – UserPosts"
        description="Fetch bài viết từ JSONPlaceholder, fetch lại khi prop userId đổi."
      >
        <label className="row">
          <span>User ID:</span>
          <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
            {USER_IDS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
        <UserPosts userId={userId} />
      </Section>

      <Section
        index={2}
        title="Countdown Timer"
        description="Đếm ngược mỗi giây, dừng ở 0; unmount sẽ clear interval."
      >
        {showTimer && <CountdownTimer key={timerKey} initialValue={COUNTDOWN_START} />}
        <div className="row">
          <button onClick={() => setTimerKey((k) => k + 1)} disabled={!showTimer}>
            Restart
          </button>
          <button className="secondary" onClick={() => setShowTimer((v) => !v)}>
            {showTimer ? 'Unmount' : 'Mount'}
          </button>
        </div>
      </Section>

      <Section
        index={3}
        title="Window Resize Listener"
        description="Thêm listener khi mount, gỡ bỏ khi unmount. Thử kéo giãn cửa sổ."
      >
        {showWindowSize ? <WindowSize /> : <p className="muted">Component đã unmount.</p>}
        <button className="secondary" onClick={() => setShowWindowSize((v) => !v)}>
          {showWindowSize ? 'Unmount' : 'Mount'}
        </button>
      </Section>

      <Section
        index={4}
        title="Form Input Validation"
        description="Validate mỗi khi value thay đổi (giống componentDidUpdate)."
      >
        <ValidatedInput
          label="Email"
          validationFunction={isValidEmail}
          errorMessage="Email không hợp lệ (ví dụ đúng: abc@fpt.edu.vn)."
        />
      </Section>
    </div>
  );
}

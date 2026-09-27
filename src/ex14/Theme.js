import { useTheme } from './ThemeContext';

export default function Theme() {
  const { themeName, theme, toggleTheme } = useTheme();

  return (
    <div
      className="theme-box"
      data-testid="theme-box"
      style={{ background: theme.background, color: theme.foreground }}
    >
      <p>
        Current theme: <strong>{themeName}</strong>
      </p>
      <button
        className="theme-button"
        onClick={toggleTheme}
        style={{ background: theme.background, color: theme.foreground, borderColor: theme.foreground }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

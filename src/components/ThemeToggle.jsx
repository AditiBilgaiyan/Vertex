import useTheme from '../hooks/useTheme';
import { IconButton } from './ui';

function ThemeToggle({ size = 'md', variant = 'ghost' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <IconButton
      icon={isDark ? 'sun' : 'moon'}
      label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      size={size}
      variant={variant}
      onClick={toggleTheme}
    />
  );
}

export default ThemeToggle;

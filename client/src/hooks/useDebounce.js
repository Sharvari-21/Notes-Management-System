import { useState, useEffect } from 'react';

/**
 * Debounces a value by the given delay (ms).
 * Used to avoid firing a search API call on every keystroke.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 400)
 */
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
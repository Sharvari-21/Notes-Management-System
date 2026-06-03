import { useEffect, useRef, useState } from 'react';

/**
 * Auto-saves form data every `interval` ms when the data has changed.
 * Returns { lastSaved, isSaving } for status display.
 *
 * @param {object} data - The current form values to save
 * @param {function} saveFn - Async function that performs the save (receives data)
 * @param {number} interval - Save interval in ms (default: 5000)
 * @param {boolean} enabled - Whether auto-save is active
 */
export default function useAutoSave(data, saveFn, interval = 5000, enabled = true) {
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const dataRef = useRef(data);
  const prevDataRef = useRef(data);

  // Keep ref in sync
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(async () => {
      const current = dataRef.current;
      const prev = prevDataRef.current;

      // Only save if something actually changed
      if (
        current.title === prev.title &&
        current.content === prev.content
      ) return;

      // Don't save if both fields are empty
      if (!current.title?.trim() && !current.content?.trim()) return;

      try {
        setIsSaving(true);
        await saveFn(current);
        prevDataRef.current = { ...current };
        setLastSaved(new Date());
      } catch {
        // Silently fail — auto-save is a convenience, not critical
      } finally {
        setIsSaving(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [saveFn, interval, enabled]);

  return { lastSaved, isSaving };
}
import { useEffect, useRef } from 'react';

// Calls onTrigger() once per day at 09:00 local time
export function useNotification(onTrigger) {
  const firedTodayRef = useRef(null); // stores the date string when last fired

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hh = now.getHours();
      const mm = now.getMinutes();
      const dateStr = now.toISOString().split('T')[0];

      if (hh === 9 && mm === 0 && firedTodayRef.current !== dateStr) {
        firedTodayRef.current = dateStr;
        onTrigger();
      }
    };

    // Check immediately in case the app is opened right at 09:00
    check();
    const interval = setInterval(check, 60_000); // check every minute
    return () => clearInterval(interval);
  }, [onTrigger]);
}

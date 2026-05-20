"use client";

import { useEffect, useMemo, useState } from "react";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  enabled?: boolean;
  decimals?: number;
}

export function useCountUp({
  end,
  start = 0,
  duration = 1.5,
  enabled = true,
  decimals = 0,
}: UseCountUpOptions) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let startTs: number | null = null;

    const tick = (timestamp: number) => {
      if (startTs === null) startTs = timestamp;
      const progress = Math.min((timestamp - startTs) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const raw = start + (end - start) * eased;
      const factor = 10 ** decimals;
      setValue(Math.round(raw * factor) / factor);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [decimals, duration, enabled, end, start]);

  return useMemo(() => value, [value]);
}

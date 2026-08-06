import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAnalysis } from "../api";

const POLL_INTERVAL_MS = 2500;

/** Loads an analysis and keeps polling while the backend is still processing it. */
export default function useAnalysis(id) {
  const [analysis, setAnalysis] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const timer = useRef(null);

  const load = useCallback(async () => {
    try {
      const { data } = await fetchAnalysis(id);
      setAnalysis(data);
      return data.status;
    } catch (err) {
      if (err?.response?.status === 404) setNotFound(true);
      return "failed";
    }
  }, [id]);

  useEffect(() => {
    let active = true;
    const tick = async () => {
      const status = await load();
      if (active && status === "processing") {
        timer.current = setTimeout(tick, POLL_INTERVAL_MS);
      }
    };
    tick();
    return () => {
      active = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [load]);

  return { analysis, notFound };
}

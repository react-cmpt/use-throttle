import { useState, useEffect, useRef } from "react";
import useThrottleFn, { ThrottleOptions } from "./useThrottleFn";

/**
 * useThrottle
 *
 * @param value
 * @param wait number @default 200
 * @param options object
 */
export default function useThrottle<T>(
  value: T,
  wait = 0,
  options?: ThrottleOptions
): T {
  const [state, setState] = useState<T>(value);

  const { callback } = useThrottleFn(
    (v: T) => {
      setState(v);
    },
    wait,
    options
  );

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    callbackRef.current(value);
  }, [value]);

  return state;
}
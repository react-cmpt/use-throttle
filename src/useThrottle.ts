import { useState, useEffect, useRef } from "react";
import useThrottleFn, { ThrottleFnOptions } from "./useThrottleFn";

/**
 * useThrottle
 *
 * @param value
 * @param wait number @default 0
 * @param options object
 */
export default function useThrottle<T>(
  value: T,
  wait = 0,
  options?: ThrottleFnOptions
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

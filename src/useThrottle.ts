import { useState, useEffect } from "react";
import useThrottleFn from "./useThrottleFn";

/**
 * useThrottle
 *
 * @param value
 * @param wait number @default 200
 */
export default function useThrottle<T>(value: T, wait = 0): T {
  const [state, setState] = useState<T>(value);

  const { callback } = useThrottleFn((v: T) => {
    setState(v);
  }, wait);

  useEffect(() => {
    callback(value);
  }, [callback, value]);

  return state;
}

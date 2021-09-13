import { useState, useEffect, useRef } from "react";

import type { ThrottleFnOptions, ControlFunctions } from "./useThrottleFn";
import useThrottleFn from "./useThrottleFn";

const valueComparison = <T>(left: T, right: T) => !(left === right);

export interface ThrottleOptions<T> extends ThrottleFnOptions {
  /** The function to customize comparisons. */
  customizer?: (left: T, right: T) => boolean;
}

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
  options?: ThrottleOptions<T>
): [T, ControlFunctions] {
  const { customizer, ...restOptions } = options || {};
  const notEqual =
    typeof customizer === "function" ? customizer : valueComparison;

  const prevValue = useRef<T>(value);
  const [state, setState] = useState<T>(value);

  const { callback, cancel, callPending } = useThrottleFn(
    (v: T) => {
      setState(v);
    },
    wait,
    restOptions
  );

  useEffect(() => {
    if (notEqual(prevValue.current, value)) {
      callback(value);
      prevValue.current = value;
    }
  }, [callback, notEqual, value]);

  return [state, { cancel, callPending }];
}

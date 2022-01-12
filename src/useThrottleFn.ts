import { useCallback, useRef, useEffect } from "react";

export type ThrottleFnOptions = {
  /** Specify invoking on the leading edge of the timeout. */
  leading?: boolean;
};

export type ControlFunctions = {
  cancel: () => void;
  callPending: () => void;
};

export interface ThrottleReturnResult<T extends any[]>
  extends ControlFunctions {
  callback: (...args: T) => void;
}

/**
 * useThrottleFn
 *
 * @param fn function
 * @param wait number @default 0
 * @param options object
 */
export default function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  wait = 0,
  options?: ThrottleFnOptions
): ThrottleReturnResult<T> {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef(fn);
  const optionsRef = useRef<ThrottleFnOptions | undefined>(options);
  const currentArgs = useRef<T>();

  fnRef.current = fn;
  optionsRef.current = options;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = undefined;
  }, []);

  const callback = useCallback(
    (...args: T) => {
      currentArgs.current = args;

      if (!timer.current) {
        if (optionsRef.current?.leading) {
          fnRef.current(...currentArgs.current);

          timer.current = setTimeout(() => {
            timer.current = undefined;
          }, wait);
        } else {
          timer.current = setTimeout(() => {
            fnRef.current(...(currentArgs.current as T));
            timer.current = undefined;
          }, wait);
        }
      }
    },
    [wait]
  );

  const callPending = useCallback(() => {
    if (!timer.current) {
      return;
    }

    fnRef.current(...(currentArgs.current as T));
    cancel();
  }, [cancel]);

  useEffect(() => cancel, [cancel]);

  return {
    callback,
    cancel,
    callPending,
  };
}

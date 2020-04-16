import { useCallback, useRef, useEffect } from "react";

export type throttleOptions = {
  /** Specify invoking on the leading edge of the timeout. */
  leading?: boolean;
};

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
  options?: throttleOptions
): { callback: (...args: T) => void; cancel: () => void } {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef(fn);
  const optionsRef = useRef<throttleOptions | undefined>(options);
  const currentArgs = useRef<any>();

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
            fnRef.current(...currentArgs.current);
            timer.current = undefined;
          }, wait);
        }
      }
    },
    [wait]
  );

  useEffect(() => cancel, [cancel]);

  return {
    callback,
    cancel,
  };
}

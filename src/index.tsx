import useThrottle, { ThrottleOptions } from "./useThrottle";
import useThrottleFn, {
  ThrottleFnOptions,
  ThrottleReturnResult,
  ControlFunctions,
} from "./useThrottleFn";

export type {
  ThrottleOptions,
  ThrottleFnOptions,
  ThrottleReturnResult,
  ControlFunctions,
};

export { useThrottle, useThrottleFn };

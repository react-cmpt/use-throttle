import { renderHook } from "@testing-library/react-hooks";

import useThrottleFn from "../src/useThrottleFn";

describe("useThrottleFn", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useThrottleFn).toBeDefined();
  });

  it("callback and cancel done", () => {
    let count = 0;
    const fn = jest.fn(() => count++);
    const { result, rerender } = renderHook(() => useThrottleFn(fn, 200));

    rerender();
    expect(fn).toHaveBeenCalledTimes(0);

    rerender();
    rerender();
    rerender();
    expect(fn).toHaveBeenCalledTimes(0);

    result.current.callback();
    result.current.callback();
    result.current.callback();
    jest.advanceTimersByTime(100);
    expect(count).toEqual(0);
    expect(fn).toHaveBeenCalledTimes(0);

    result.current.callback();
    result.current.callback();
    result.current.callback();
    jest.advanceTimersByTime(100);
    expect(count).toEqual(1);
    expect(fn).toHaveBeenCalledTimes(1);

    result.current.callback();
    result.current.callback();
    result.current.callback();
    jest.advanceTimersByTime(200);
    expect(count).toEqual(2);
    expect(fn).toHaveBeenCalledTimes(2);

    result.current.callback();
    result.current.callback();
    result.current.callback();
    result.current.cancel();
    jest.runAllTimers();
    expect(count).toBe(2);
  });

  it("callback props", () => {
    let count = 0;
    const fn = jest.fn(props => {
      count = props;
    });
    const { result } = renderHook(() => useThrottleFn(fn, 200));

    result.current.callback(1);
    result.current.callback(2);
    result.current.callback(3);
    jest.advanceTimersByTime(100);
    expect(count).toEqual(0);
    expect(fn).toHaveBeenCalledTimes(0);

    result.current.callback(4);
    result.current.callback(5);
    jest.advanceTimersByTime(100);
    expect(count).toEqual(5);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("Options: leading", () => {
    let count = 0;
    const fn = jest.fn(props => {
      count = props;
    });
    const { result } = renderHook(() =>
      useThrottleFn(fn, 200, { leading: true })
    );

    result.current.callback(1);
    result.current.callback(2);
    result.current.callback(3);
    jest.advanceTimersByTime(100);
    expect(count).toEqual(1);
    expect(fn).toHaveBeenCalledTimes(1);

    result.current.callback(4);
    result.current.callback(5);
    jest.advanceTimersByTime(100);
    expect(count).toEqual(1);
    expect(fn).toHaveBeenCalledTimes(1);

    result.current.callback(6);
    result.current.callback(7);
    jest.advanceTimersByTime(200);
    expect(count).toEqual(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

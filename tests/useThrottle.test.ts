import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";

import useThrottle from "../src/useThrottle";

describe("useThrottle", () => {
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
    expect(useThrottle).toBeDefined();
  });

  it("Init", () => {
    let hook: RenderHookResult<number, number>;

    act(() => {
      hook = renderHook(props => useThrottle(props, 200), {
        initialProps: 0,
      });
    });

    act(() => {
      hook.rerender();
      expect(hook.result.current).toEqual(0);

      hook.rerender();
      hook.rerender();
      hook.rerender();
      jest.advanceTimersByTime(100);
      expect(hook.result.current).toEqual(0);

      hook.rerender(1);
      hook.rerender(2);
      hook.rerender(3);
      jest.advanceTimersByTime(200);
      expect(hook.result.current).toEqual(3);

      hook.rerender(4);
      hook.rerender(5);
      jest.advanceTimersByTime(200);
      expect(hook.result.current).toEqual(5);
    });
  });

  it("Options: leading", () => {
    let hook: RenderHookResult<number, number>;

    act(() => {
      hook = renderHook(props => useThrottle(props, 200, { leading: true }), {
        initialProps: 0,
      });
    });

    act(() => {
      hook.rerender();
      expect(hook.result.current).toEqual(0);

      hook.rerender(1);
      jest.advanceTimersByTime(100);
      expect(hook.result.current).toEqual(0);

      hook.rerender(2);
      jest.advanceTimersByTime(1);
      hook.rerender(3);
      jest.advanceTimersByTime(99);
      expect(hook.result.current).toEqual(0);

      hook.rerender(4);
      jest.advanceTimersByTime(100);
      hook.rerender(5);
      jest.advanceTimersByTime(100);
      expect(hook.result.current).toEqual(4);
    });
  });
});

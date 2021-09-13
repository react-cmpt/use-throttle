import type { RenderHookResult } from "@testing-library/react-hooks";
import { renderHook, act } from "@testing-library/react-hooks";

import type { ControlFunctions } from "../src/useThrottleFn";
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
    let hook: RenderHookResult<number, [number, ControlFunctions]>;

    void act(() => {
      hook = renderHook((props: number) => useThrottle(props, 200), {
        initialProps: 0,
      });
    });

    void act(() => {
      hook.rerender();
      expect(hook.result.current[0]).toEqual(0);

      hook.rerender();
      hook.rerender();
      hook.rerender();
      jest.advanceTimersByTime(100);
      expect(hook.result.current[0]).toEqual(0);

      hook.rerender(1);
      hook.rerender(2);
      hook.rerender(3);
      jest.advanceTimersByTime(200);
      expect(hook.result.current[0]).toEqual(3);

      hook.rerender(4);
      hook.rerender(5);
      jest.advanceTimersByTime(200);
      expect(hook.result.current[0]).toEqual(5);
    });
  });

  it("Options: leading", () => {
    let hook: RenderHookResult<number, [number, ControlFunctions]>;

    void act(() => {
      hook = renderHook(
        (props: number) => useThrottle(props, 200, { leading: true }),
        {
          initialProps: 0,
        }
      );
    });

    void act(() => {
      hook.rerender();
      expect(hook.result.current[0]).toEqual(0);

      hook.rerender(1);
      jest.advanceTimersByTime(100);
      expect(hook.result.current[0]).toEqual(1);

      hook.rerender(2);
      jest.advanceTimersByTime(1);
      hook.rerender(3);
      jest.advanceTimersByTime(99);
      expect(hook.result.current[0]).toEqual(1);

      hook.rerender(4);
      jest.advanceTimersByTime(100);
      hook.rerender(5);
      jest.advanceTimersByTime(100);
      expect(hook.result.current[0]).toEqual(4);
    });
  });

  it("Options: customizer", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 2 };
    const obj3 = { a: 2, b: 3 };
    type Obj = typeof obj1;

    const customizer = (l: Obj, r: Obj) => l.b != r.b;

    let hook: RenderHookResult<Obj, [Obj, ControlFunctions]>;

    void act(() => {
      hook = renderHook(
        (props: Obj) => useThrottle(props, 200, { customizer }),
        {
          initialProps: obj1,
        }
      );
    });

    void act(() => {
      hook.rerender();
      expect(hook.result.current[0]).toEqual(obj1);

      hook.rerender(obj2);
      jest.advanceTimersByTime(100);
      expect(hook.result.current[0]).toEqual(obj1);

      hook.rerender(obj3);
      jest.advanceTimersByTime(1);
      hook.rerender(obj3);
      jest.advanceTimersByTime(99);
      expect(hook.result.current[0]).toEqual(obj1);

      hook.rerender(obj3);
      jest.advanceTimersByTime(100);
      expect(hook.result.current[0]).toEqual(obj3);
    });
  });

  it("Return functions", () => {
    const { rerender, result } = renderHook(
      (props: number) => useThrottle(props, 200),
      {
        initialProps: 0,
      }
    );

    void act(() => {
      rerender();
    });
    expect(result.current[0]).toEqual(0);

    void act(() => {
      rerender(4);
      rerender(5);
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toEqual(5);

    void act(() => {
      rerender(6);
      jest.advanceTimersByTime(100);
      result.current[1].cancel();
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toEqual(5);

    void act(() => {
      rerender(7);
      jest.advanceTimersByTime(100);
      result.current[1].callPending();
    });
    expect(result.current[0]).toEqual(7);
  });
});

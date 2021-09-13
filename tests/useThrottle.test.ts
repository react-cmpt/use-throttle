import { useCallback, useState } from "react";
import type { RenderHookResult } from "@testing-library/react-hooks";
import { renderHook, act } from "@testing-library/react-hooks";

import type { ControlFunctions } from "../src/useThrottleFn";
import useThrottle from "../src/useThrottle";

describe("useThrottle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useThrottle).toBeDefined();
  });

  it("Init", () => {
    const hook = renderHook((props: number) => useThrottle(props, 200), {
      initialProps: 0,
    });

    act(() => {
      hook.rerender();
    });
    expect(hook.result.current[0]).toEqual(0);

    hook.rerender();
    hook.rerender();
    hook.rerender();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(hook.result.current[0]).toEqual(0);
    jest.advanceTimersByTime(100);
    expect(hook.result.current[0]).toEqual(0);

    hook.rerender(1);
    hook.rerender(2);
    hook.rerender(3);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(hook.result.current[0]).toEqual(3);

    hook.rerender(4);
    hook.rerender(5);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(hook.result.current[0]).toEqual(5);

    hook.unmount();
  });

  it("state value", () => {
    const { result, unmount } = renderHook(() => {
      const [num, setNum] = useState(0);
      const [value] = useThrottle(num, 200);

      const callback = useCallback((n: number) => {
        setNum(n);
      }, []);

      return {
        callback,
        value,
      };
    });

    expect(result.current.value).toEqual(0);

    act(() => {
      result.current.callback(1);
      result.current.callback(2);
      result.current.callback(3);
      jest.advanceTimersByTime(200);
    });

    expect(result.current.value).toEqual(3);

    act(() => {
      result.current.callback(4);
    });
    expect(result.current.value).toEqual(3);

    act(() => {
      result.current.callback(5);
      jest.advanceTimersByTime(200);
    });
    expect(result.current.value).toEqual(5);

    act(() => {
      result.current.callback(6);
      jest.advanceTimersByTime(200);
    });

    unmount();

    expect(result.current.value).toEqual(5);
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

    const hook = renderHook(
      (props: Obj) => useThrottle(props, 200, { customizer }),
      {
        initialProps: obj1,
      }
    );

    hook.rerender();
    expect(hook.result.current[0]).toEqual(obj1);

    hook.rerender(obj2);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(hook.result.current[0]).toEqual(obj1);

    hook.rerender(obj3);
    act(() => {
      jest.advanceTimersByTime(1);
      jest.advanceTimersByTime(99);
    });
    expect(hook.result.current[0]).toEqual(obj1);

    hook.rerender(obj3);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(hook.result.current[0]).toEqual(obj3);
  });

  it("Return functions", () => {
    const { rerender, result, unmount } = renderHook(
      (props: number) => useThrottle(props, 200),
      {
        initialProps: 0,
      }
    );

    rerender();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toEqual(0);

    rerender(4);
    rerender(5);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toEqual(5);

    rerender(6);
    act(() => {
      jest.advanceTimersByTime(100);
      result.current[1].cancel();
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toEqual(5);

    rerender(7);
    act(() => {
      jest.advanceTimersByTime(100);
      result.current[1].callPending();
    });
    expect(result.current[0]).toEqual(7);

    unmount();
  });
});

describe("useThrottle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("0ms", () => {
    const { rerender, result } = renderHook(
      (props: number) => useThrottle(props),
      {
        initialProps: 0,
      }
    );

    rerender();
    expect(result.current[0]).toEqual(0);

    rerender(1);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[0]).toEqual(1);

    rerender(2);
    rerender(3);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[0]).toEqual(3);
  });
});

# use-throttle

The throttled value / function hook for react

[![CI](https://github.com/react-cmpt/use-throttle/workflows/CI/badge.svg?branch=master)](https://github.com/react-cmpt/use-throttle/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/@react-cmpt/use-throttle.svg)](https://www.npmjs.com/package/@react-cmpt/use-throttle)
[![GitHub license](https://img.shields.io/github/license/react-cmpt/use-throttle)](https://github.com/react-cmpt/use-throttle/blob/master/LICENSE)

## Usage

### Installation

```shell
yarn add @react-cmpt/use-throttle
```

### useThrottle

throttled value

<table>
  <tr>
    <th colspan="2">option</th>
    <th>type</th>
    <th>default</th>
    <th>explain</th>
  </tr>
  <tr>
    <td colspan="2">value</td>
    <td>any</td>
    <td>-</td>
    <td>The value to throttle.</td>
  </tr>
  <tr>
    <td colspan="2">wait</td>
    <td>number</td>
    <td>0</td>
    <td>The number of milliseconds to throttle invocations to.</td>
  </tr>
  <tr>
    <td rowspan="1">options</td>
    <td>leading</td>
    <td>boolean</td>
    <td>-</td>
    <td>Specify invoking on the leading edge of the timeout.</td>
  </tr>
</table>

| return | type | explain                          |
| ------ | ---- | -------------------------------- |
| value  | any  | Returns the new throttled value. |

```tsx
import { useThrottle } from "@react-cmpt/use-throttle";

const Demo = ({ value }) => {
  const tValue = useThrottle(value, 200);

  // ...
};
```

### useThrottleFn

throttled function

<table>
  <tr>
    <th colspan="2">option</th>
    <th>type</th>
    <th>default</th>
    <th>explain</th>
  </tr>
  <tr>
    <td colspan="2">fn</td>
    <td>function</td>
    <td>-</td>
    <td>The function to throttle.</td>
  </tr>
  <tr>
    <td colspan="2">wait</td>
    <td>number</td>
    <td>0</td>
    <td>The number of milliseconds to throttle invocations to.</td>
  </tr>
  <tr>
    <td rowspan="1">options</td>
    <td>leading</td>
    <td>boolean</td>
    <td>-</td>
    <td>Specify invoking on the leading edge of the timeout.</td>
  </tr>
</table>

| return      | type     | explain                         |
| ----------- | -------- | ------------------------------- |
| callback    | function | The new throttled function.     |
| cancel      | function | The clear timer function.       |
| callPending | function | The callback manually function. |

```tsx
import { useThrottleFn } from "@react-cmpt/use-throttle";

const Demo = () => {
  const { callback, cancel } = useThrottleFn(() => {
    console.log("click");
  }, 200);

  return <button onClick={callback}>++</button>;
};
```

> useDebounce, useDebounceCallback -> [use-debounce](https://github.com/xnimorz/use-debounce)

## Dev

```shell
# build package
yarn build

# tests
yarn test

# lint
yarn lint
```

## License

[MIT](./LICENSE)

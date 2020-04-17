# use-throttle

The throttle value/function hook for react

[![CI](https://github.com/react-cmpt/use-throttle/workflows/CI/badge.svg?branch=master)](https://github.com/react-cmpt/use-throttle/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/@react-cmpt/use-throttle.svg)](https://www.npmjs.com/package/@react-cmpt/use-throttle)
[![GitHub license](https://img.shields.io/github/license/react-cmpt/use-throttle)](https://github.com/react-cmpt/use-throttle/blob/master/LICENSE)

## Usage

### Installation

```shell
yarn add @react-cmpt/use-throttle
```

### useThrottle

throttle value

| option  | type                 | default | explain                                             |
| ------- | -------------------- | ------- | --------------------------------------------------- |
| value   | any                  |         |                                                     |
| wait    | number               | 0       |                                                     |
| options | { leading: boolean } |         | Specify invoking on the leading edge of the timeout |

| return | type | default | explain |
| ------ | ---- | ------- | ------- |
| value  | any  |         |         |

```tsx
import { useThrottle } from "@react-cmpt/use-throttle";

const Demo = ({ value }) => {
  const tValue = useThrottle(value, 200);

  // ...
};
```

### useThrottleFn

throttle function

| option  | type                 | default | explain                                             |
| ------- | -------------------- | ------- | --------------------------------------------------- |
| fn      | function             |         |                                                     |
| wait    | number               | 0       |                                                     |
| options | { leading: boolean } |         | Specify invoking on the leading edge of the timeout |

| return   | type     | default | explain |
| -------- | -------- | ------- | ------- |
| callback | function |         |         |
| cancel   | function |         |         |

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

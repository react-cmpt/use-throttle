## [0.3.3](https://github.com/react-cmpt/use-throttle/compare/v0.3.2...v0.3.3) (2022-01-12)


### Features

* **useThrottleFn:** support typescript 4.5. ([04920c0](https://github.com/react-cmpt/use-throttle/commit/04920c040220d0f35bf71b620df7cb514431788c))



## [0.3.2](https://github.com/react-cmpt/use-throttle/compare/v0.3.1...v0.3.2) (2021-04-10)


### Features

* export types separately. ([c3fbd6e](https://github.com/react-cmpt/use-throttle/commit/c3fbd6e042ab47ef88af0dd4f0507aca35502d93))



## [0.3.1](https://github.com/react-cmpt/use-throttle/compare/v0.3.0...v0.3.1) (2021-04-05)


### Features

* export `ControlFunctions` type. ([ef17e26](https://github.com/react-cmpt/use-throttle/commit/ef17e2671676bc20d195ebfc7d12f4592326bf28))



# [0.3.0](https://github.com/react-cmpt/use-throttle/compare/v0.2.2...v0.3.0) (2020-09-29)


### Features

- **useThrottle:** `customizer` option and returns ([442b42f](https://github.com/react-cmpt/use-throttle/commit/442b42f7818f8d7ad61800c859d2f37066ae9c84))
  1. type: add `ThrottleOptions`;
  2. options: `customizer` (The function to customize comparisons);
  3. returns: value -> object. (`[T, ControlFunctions]`).
- **useThrottleFn:** split returns and rename options type ([c0938da](https://github.com/react-cmpt/use-throttle/commit/c0938da40151eca5606be52e65c2847f47a0c597))
  1. type: `ThrottleOptions` -> `ThrottleFnOptions`;
  2. type: `ThrottleReturnResult` -> `ControlFunctions` + `ThrottleReturnResult`.



## [0.2.2](https://github.com/react-cmpt/use-throttle/compare/v0.2.1...v0.2.2) (2020-06-28)


### Refactor

* remove `react-dom` (peerDependencies) ([0b302f9](https://github.com/react-cmpt/use-throttle/commit/0b302f9062663294a2da22b79bdf6553d7df2cd3))



## [0.2.1](https://github.com/react-cmpt/use-throttle/compare/v0.2.0...v0.2.1) (2020-06-02)


### Bug Fixes

* **callPending:** timer null ([5de230e](https://github.com/react-cmpt/use-throttle/commit/5de230efd76fd9e36da2b94a33ba1da4d7586096))



# [0.2.0](https://github.com/react-cmpt/use-throttle/compare/v0.1.1...v0.2.0) (2020-04-26)


### Features

* **useThrottleFn:** return callPending ([bc111a4](https://github.com/react-cmpt/use-throttle/commit/bc111a4af70ee7cd899a2586b7e2cae67cf002a5))



## [0.1.1](https://github.com/react-cmpt/use-throttle/compare/v0.1.0...v0.1.1) (2020-04-23)


### Features

* build commonjs module in lib ([cb00d34](https://github.com/react-cmpt/use-throttle/commit/cb00d347213591d53df17708050e806a0f468f49))



# [0.1.0](https://github.com/react-cmpt/use-throttle/compare/v0.1.0-alpha2...v0.1.0) (2020-04-17)


### Refactor

* **useThrottleFn:** `throttleOptions` -> `ThrottleOptions` (rename) ([05ff61f](https://github.com/react-cmpt/use-throttle/commit/05ff61fb36674348be662a704796508b0dc88e90))



# [0.1.0-alpha2](https://github.com/react-cmpt/use-throttle/compare/v0.1.0-alpha...v0.1.0-alpha2) (2020-04-16)


### Bug Fixes

* **useThrottleFn:** unmount clear timer ([80c987f](https://github.com/react-cmpt/use-throttle/commit/80c987fa4bcd3cc7b2f15e00cfe5640d5d9a7b66))


### Features

* **useThrottle:** options (leading) and ref callback ([ac103d0](https://github.com/react-cmpt/use-throttle/commit/ac103d0ff4c7c051d9a6130d328b287c3959ecb5))
* **useThrottleFn:** options (leading) ([c56994c](https://github.com/react-cmpt/use-throttle/commit/c56994cd5bb1d2962b1c6e909d95b0aa1cea32e0))
* default wait 0 ([ba2c1d4](https://github.com/react-cmpt/use-throttle/commit/ba2c1d4e0b14c1631364c25711e4cd3aeff95299))



# [0.1.0-alpha](https://github.com/react-cmpt/use-throttle/compare/1ac12bb36c8f6a8945388c3d9e228002e7c8cf21...v0.1.0-alpha) (2020-04-10)


### Features

* useThrottle / useThrottleFn ([1ac12bb](https://github.com/react-cmpt/use-throttle/commit/1ac12bb36c8f6a8945388c3d9e228002e7c8cf21))




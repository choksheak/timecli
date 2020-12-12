# timecli

A super tiny and simple CLI utility to time the execution of another CLI command.
Written in Javascript to minimize the number of dependencies (e.g. Golang, Rust etc.)
to your package. The execution time overhead to your script is likely less than
0.1 seconds, which should be neglible in most cases.

## Usage

```
> npx timecli
[timecli] Usage: npx timecli [command] <arguments> ...
```

## Example

```sh
> npx timecli node test.js

[test.js] Test script: Yellow Cyan Green Red

[timecli] Took 0.082s. [Exit code = 0]
```

## Example 2

```sh
> npx timecli sleep 10

[timecli] Took 10.688s. [Exit code = 0]
```
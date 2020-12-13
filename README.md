# timecli ⏱️

A super tiny and simple CLI utility to time the execution of another CLI command.
Written in Javascript to minimize the number of dependencies (e.g. Golang, Rust etc.)
to your package. The execution time overhead to your script is likely less than
0.1 seconds, which should be negligible in most cases.

## How to install

Most likely you will need this for local development only.

```
npm i -D timecli
```

## Why do you need this?

I searched around (Dec 2020) and was unable to find any npm package that serves the same purpose. The closest match is [gnomon](https://www.npmjs.com/package/gnomon), but the output is too heavy and it loses all console colors from the original output.

Some reasons why you want to install this package:
1. Cross-platform portability - no need to worry about using platform-specific timer executables.
2. Tiny in size - There are a few minimally-needed dependencies, but they are also tiny.
3. Uses pure Node + Javascript only - no need to deal with potential antivirus warnings from running `.exe` files.
4. Fast - takes 0.1 seconds or less to run.
5. Simple - Outputs a one-liner at the end of the run, showing the time clearly.
6. Convenient - Able to run any command from your PATH environment variable or in your local `node_modules/.bin` directory.
7. Non-intrusive - Just prepend any command with `timecli` in your package.json to time the task everytime you run it!
8. Fun! - console output is colored!

## Usage

```sh
> npx timecli
[timecli] Usage: npx timecli [command] <arguments> ...
```

## Examples

### Test script

```sh
> npx timecli node test.js

[test.js] Test script: Yellow Cyan Green Red

[timecli] Took 0.082s. [Exit code = 0]
```

### Sleep

```sh
> npx timecli sleep 10

[timecli] Took 10.688s. [Exit code = 0]
```

### Over one minute
```sh
> npx timecli sleep 70

[timecli] Took 1m 12s (72.517s). [Exit code = 0]
```

## Related tool

If you want a native CLI tool that does pretty much the same thing, you can download timeit from https://github.com/choksheak/timeit which is written in Golang.

## Enjoy!

Hope you have fun using this script! 😄

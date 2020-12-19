#!/usr/bin/env node

const path = require("path");
const crossSpawn = require("cross-spawn");
const npmRunPath = require("npm-run-path");
const colors = require("kleur/colors");

const prefix = colors.dim("[timecli] ");
const localeOptions = { minimumFractionDigits: 3, maximumFractionDigits: 3 };

const num3dp = (n) => n.toLocaleString(undefined, localeOptions);

const getTimeTaken = (totalMs) => {
  const secNum = totalMs / 1000;
  let output = colors.cyan(num3dp(secNum) + "s");

  if (secNum >= 60) {
    const minsNum = Math.floor(secNum / 60).toLocaleString();
    const secMod = num3dp(secNum % 60);
    output = colors.yellow(minsNum + "m " + secMod + "s") + " (" + output + ")";
  }

  return output;
};

const runCommand = async (args) => {
  const startMillis = Date.now();

  const exitCode = await new Promise((resolve) => {
    const childProcess = crossSpawn(args[0], args.slice(1), {
      env: npmRunPath.env(),
      stdio: "inherit",
    });

    childProcess.on("error", (error) => {
      console.error(`Failed to spawn command: ${JSON.stringify(args)}`);
      console.error(error);
    });
    childProcess.on("close", (exitCode) => resolve(exitCode));
  });

  const timeTaken = getTimeTaken(Date.now() - startMillis);
  const exitCodeStr = `[Exit code: ${exitCode}]`;
  const exitCodeColored =
    exitCode === 0 ? colors.green(exitCodeStr) : colors.red(exitCodeStr);

  console.log(`${prefix}Took ${timeTaken}. ${exitCodeColored}`);

  // Exit using the same exit code as the child process.
  process.exit(exitCode);
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    const cmd = colors.green(colors.bold("timecli"));
    console.error(`${prefix}Usage: npx ${cmd} [command] <arguments> ...`);
    process.exit(1);
  }

  runCommand(args);
};

main();

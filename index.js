#!/usr/bin/env node

const spawn = require("cross-spawn");
const npmRunPath = require('npm-run-path');
const colors = require("kleur/colors");

const prefix = colors.dim("[timecli]") + " ";

const getTimeTaken = totalMs => {
    const secNum = Math.floor(totalMs / 1000);
    const secStr = secNum.toLocaleString();
    const msMod = (totalMs % 1000).toString();
    const msStr = "00".substring(msMod.length - 1) + msMod;
    let output = colors.cyan(secStr + "." + msStr + "s");

    if (secNum >= 60) {
        const minsNum = Math.floor(secNum / 60).toLocaleString();
        const secMod = secNum % 60;
        output = colors.yellow(minsNum + "m " + secMod + "s") + " (" + output + ")";
    }

    return output;
};

const runCommand = async args => {
    const startMillis = Date.now();

    const exitCode = await new Promise(resolve => {
        const childProcess = spawn(args[0], args.slice(1), {
            env: npmRunPath.env({
                env: process.env,
                cwd: process.cwd(),
                execPath: process.execPath
            }),
            stdio: "inherit"
        });

        childProcess.on('close', exitCode => {
            resolve(exitCode);
        });
    });

    const timeTaken = getTimeTaken(Date.now() - startMillis);
    const exitCodeStr = `[Exit code = ${exitCode}]`;
    const exitCodeColored = exitCode === 0
        ? colors.green(exitCodeStr)
        : colors.red(exitCodeStr);

    console.log(`\n${prefix}Took ${timeTaken}. ${exitCodeColored}`);
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`${prefix}Usage: npx timecli [command] <arguments> ...`);
    process.exit(1);
  }

  runCommand(args);
};

main();

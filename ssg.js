#!/usr/bin/env node

const packageJson = require('./package.json');
const { createDom, serializeDom } = require('./src/utils/dom');
const { parseProcArgs } = require('./src/utils/args');

const config = parseProcArgs();

if (config.switches.version || config.shortSwitches.v) {
  console.log(`${packageJson.name} - v${packageJson.version}`);
  process.exit();
}

const dom = createDom();

console.log(serializeDom(dom));

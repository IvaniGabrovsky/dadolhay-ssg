#!/usr/bin/env node

const packageJson = require('./package.json');
const { createDocument, serializeDom } = require('./src/utils/dom');
const { parseProcArgs } = require('./src/utils/args');

const options = {
  version: { long: 'version', short: 'v', hasValue: false },
  help: { long: 'help', short: 'h', hasValue: false },
  input: { long: 'input', short: 'i', hasValue: true },
};

let config;
try {
  config = parseProcArgs({ options });
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
  process.exit(1);
}

if (config.parsedParams.version) {
  // eslint-disable-next-line no-console
  console.log(`${packageJson.name} - v${packageJson.version}`);
  process.exit();
}

const dom = createDocument({ title: 'Foobar' });

console.log(serializeDom(dom));

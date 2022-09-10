#!/usr/bin/env node

const { parseFileToBlocks } = require('./src/utils/textParser');
const { createDocument, serializeDom } = require('./src/utils/dom');
const { parseProcArgs, printArgsUsage } = require('./src/utils/args');
const { generateFileListFromPath } = require('./src/utils/fileList');
const options = require('./src/constants/options');
const packageJson = require('./package.json');

const DEFAULT_RESULT_FOLDER = 'dist';

let config;
try {
  config = parseProcArgs({ options });
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
  process.exit(1);
}

// Version
if (config.parsedParams.version) {
  // eslint-disable-next-line no-console
  console.log(`${packageJson.name} - v${packageJson.version}`);
  process.exit();
}

// Help
if (config.parsedParams.help) {
  printArgsUsage({ options });
  process.exit();
}

/**
 * At this point we know that we will have do do the work
 */

// Verify input is given
if (!config.parsedParams.input) {
  // eslint-disable-next-line no-console
  console.log('Input parameter missing');
  process.exit(1);
}

const toProcessArr = generateFileListFromPath({
  inputPath: config.parsedParams.input,
  outputPath: config.parsedParams.outout || DEFAULT_RESULT_FOLDER,
});

toProcessArr.forEach(({ input, output }) => {
  parseFileToBlocks(input);
  const dom = createDocument({ title: 'Foobar' });
});

// console.log(serializeDom(dom));

#!/usr/bin/env node

const { parseFileToBlocks } = require('./src/utils/textParser');
const { createDocument, serializeDom } = require('./src/utils/dom');
const {
  parseProcArgs,
  printArgsUsage,
  parseConfigArgs,
} = require('./src/utils/args');
const {
  destroypath,
  generateFileListFromPath,
  writeFile,
} = require('./src/utils/file');
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

// Verify input or config is given
let outputDirPath = DEFAULT_RESULT_FOLDER;
let language = 'en-CA';
if (config.parsedParams.input) {
  language = config.parsedParams.language || language;
  outputDirPath = config.parsedParams.output || outputDirPath;
} else if (config.parsedParams.config) {
  config = parseConfigArgs(config.parsedParams.config);
  language = config.parsedParams.language || language;
  outputDirPath = config.parsedParams.output || outputDirPath;
} else {
  // eslint-disable-next-line
  console.log('Input or config parameter missing');
  process.exit(1);
}

try {
  // Destroy output dir if exists
  destroypath(outputDirPath);

  const toProcessArr = generateFileListFromPath({
    inputPath: config.parsedParams.input,
    outputPath: outputDirPath,
  });

  if (!toProcessArr.length) throw new Error('No txt files to process');

  toProcessArr.forEach(({ input, output }) => {
    // eslint-disable-next-line no-console
    console.log(`Generating: ${output}`);

    const blocks = parseFileToBlocks(input);

    const dom = createDocument({
      // This will will either spread false (does nothing) or the object with title
      ...(blocks[0].type === 'title' && { title: blocks[0].content[0] }),
      blocks,
      language,
    });
    writeFile({ output, content: serializeDom(dom) });
  });
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
  process.exit(1);
}

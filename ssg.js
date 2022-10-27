#!/usr/bin/env node

import process from './src/utils/processor/processor.js';
import { wrapDom } from './src/utils/dom.js';
import {
  parseProcArgs,
  printArgsUsage,
  parseConfigArgs,
} from './src/utils/args.js';
import {
  destroypath,
  generateFileListFromPath,
  writeFile,
} from './src/utils/file.js';
import options from './src/constants/options.js';

const DEFAULT_RESULT_FOLDER = 'dist';
const DEFAULT_LANGUAGE = 'en-CA';

let config;
try {
  config = parseProcArgs({ options });

  // Version
  if (config.parsedParams.version) {
    // TODO FIXME get this from package.json once eslint supports "assert"
    // eslint-disable-next-line no-console
    console.log(`dadolhay-ssg - v0.0.1`);
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

  let { parsedParams } = config;
  if (parsedParams.config) {
    parsedParams = {
      ...parsedParams,
      ...parseConfigArgs(config.parsedParams.config),
    };
  }
  // Verify input is given
  if (!parsedParams.input) {
    // eslint-disable-next-line no-console
    console.log('Input parameter missing');
    process.exit(1);
  }
  const {
    language = DEFAULT_LANGUAGE,
    output: outputDirPath = DEFAULT_RESULT_FOLDER,
  } = parsedParams;

  // Destroy output dir if exists
  destroypath(outputDirPath);

  const toProcessArr = generateFileListFromPath({
    inputPath: parsedParams.input,
    outputPath: outputDirPath,
  });

  if (!toProcessArr.length) throw new Error('No txt files to process');

  toProcessArr.forEach(({ input, output }) => {
    // eslint-disable-next-line no-console
    console.log(`Generating: ${output}`);

    const { body, title } = process(input);

    writeFile({ output, content: wrapDom({ title, body, language }) });
  });
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e.message);
  process.exit(1);
}

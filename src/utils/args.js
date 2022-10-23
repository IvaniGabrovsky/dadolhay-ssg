import path from 'path';
import fs from 'fs';

/**
 * This Fn is responsible for parsing the arguments given to this script
 *
 * LIMITATIONS
 * - It loses the order of the switches (but not the files)
 * - All values will be strings (will not cast to number)
 */

const parseProcArgs = ({ options }) => {
  const clonedArgArr = [...process.argv]; // Need to clone to be able to mutate
  const freeFloatingParams = []; // Usually some kind of path
  const parsedParams = {};
  clonedArgArr.shift(); // node executable path
  const selfPath = clonedArgArr.shift(); // path of script

  while (clonedArgArr.length) {
    const element = clonedArgArr.shift();
    const [, dashes, key, inlineValue] = element.match(
      /^(-*)([a-zA-Z_-]*)=?(.*?)$/
    );

    // Check if it's a free floating parameter, like a filesystem path
    if (!dashes) {
      freeFloatingParams.push(element);
      continue;
    }

    /**
     * Loop through all the options, try to find the key for the one matching
     * the "element" we are trying to find
     */
    const optionKey = Object.keys(options).find(
      i => options[i][dashes.length === 1 ? 'short' : 'long'] === key
    );

    // Throw if not found
    if (!optionKey) throw new Error(`Unknown option ${element}`);

    if (!options[optionKey].hasValue) {
      // This parameter does not require a value
      parsedParams[optionKey] = true;
      continue;
    }

    /**
     * It requires a value
     */

    // `inlineValue` is always a string, represents the value in the --key=value format
    if (inlineValue) {
      parsedParams[optionKey] = inlineValue;
      continue;
    }

    // Verify that we have a value in the next arg. Throw if not
    if (!clonedArgArr[0] || clonedArgArr[0].startsWith('-'))
      throw new Error(`${element} requires a value`);

    // Take the next item in the array as value
    parsedParams[optionKey] = clonedArgArr.shift();
  }

  return { selfPath, freeFloatingParams, parsedParams };
};

/**
 * This Fn is responsible for printing the usage information
 */
const printArgsUsage = ({ options }) => {
  const { shortPad, longPad } = Object.values(options).reduce(
    (acc, { short, long }) => ({
      shortPad: Math.max(acc.shortPad, short?.length ?? 0),
      longPad: Math.max(acc.longPad, long?.length ?? 0),
    }),
    { shortPad: 0, longPad: 0 }
  );

  // eslint-disable-next-line no-console
  console.log('Usage:');

  Object.keys(options)
    .sort()
    .forEach(key => {
      const { short, long, description } = options[key];
      const shortPart = (short ? `-${short}` : '').padStart(shortPad + 1, ' ');
      const longPart = (long ? `--${long}` : '').padStart(longPad + 2, ' ');
      // eslint-disable-next-line no-console
      console.log(`    ${shortPart}  ${longPart}    ${description}`);
    });
};

const parseConfigArgs = configFile => {
  try {
    // check if file exist
    if (!fs.existsSync(path.resolve(configFile))) {
      // eslint-disable-next-line
      console.log('Config file does not exist.');
      process.exit(1);
    }
    // load json file
    const data = fs.readFileSync(configFile, 'utf8');

    return JSON.parse(data);
  } catch (err) {
    // Retghrow with meaningful error
    throw new Error('Config file does not exist or is not correct JSON file.');
  }
};

export { parseProcArgs, printArgsUsage, parseConfigArgs };

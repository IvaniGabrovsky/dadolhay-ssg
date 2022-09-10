/**
 * This module is responsible for parsing the arguments given to this script
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

module.exports = { parseProcArgs };

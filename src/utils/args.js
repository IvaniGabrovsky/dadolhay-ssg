/**
 * This module is responsible for parsing the arguments given to this script
 *
 * LIMITATIONS
 * - Values must be sent with -k=value or --key=value format
 * - It loses the order of the switches (but not the files)
 * - All values will be strings (will not cast to number)
 */

const parseProcArgs = () => {
  const result = { switches: {}, shortSwitches: {}, files: [] };

  process.argv.forEach(element => {
    const [, dashes, key, value] = element.match(/^(-*)([a-zA-Z_-]*)=?(.*?)/);

    if (dashes === '--') {
      result.switches[key] = value || true;
    } else if (dashes === '-') {
      result.shortSwitches[key] = value || true;
    } else {
      result.files.push(element);
    }
  });

  const [, selfPath, ...files] = result.files;
  result.selfPath = selfPath;
  result.files = files;

  return result;
};

module.exports = { parseProcArgs };

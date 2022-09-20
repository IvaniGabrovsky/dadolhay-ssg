const options = {
  version: {
    long: 'version',
    short: 'v',
    hasValue: false,
    description: 'Print version and exir',
  },
  help: {
    long: 'help',
    short: 'h',
    hasValue: false,
    description: 'Print usage info and exit',
  },
  input: {
    long: 'input',
    short: 'i',
    hasValue: true,
    description: 'Provide input file or folder',
  },
  output: {
    long: 'output',
    short: 'o',
    hasValue: true,
    description: 'Output folder for the generated files. Default: `dist`',
  },
};

module.exports = options;

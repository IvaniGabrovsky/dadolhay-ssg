const options = {
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
  language: {
    long: 'lang',
    short: 'l',
    hasValue: true,
    description: 'Language attribute in generated HTML tag',
  },
  output: {
    long: 'output',
    short: 'o',
    hasValue: true,
    description: 'Output folder for the generated files. Default: `dist`',
  },
  version: {
    long: 'version',
    short: 'v',
    hasValue: false,
    description: 'Print version and exir',
  },
};

module.exports = options;

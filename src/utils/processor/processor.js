import textProcessor from './textProcessor.js';
import mdProcessor from './mdProcessor.js';

const process = input => {
  if (input.toLowerCase().endsWith('.txt')) return textProcessor(input);
  if (input.toLowerCase().endsWith('.md')) return mdProcessor(input);

  throw new Error(`${input} is neither a "txt" nor an "md" file`);
};

export default process;

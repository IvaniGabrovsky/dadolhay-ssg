import { micromark } from 'micromark';
import fs from 'fs';

const mdProcessor = input => {
  const content = fs.readFileSync(input, 'utf8');

  const body = micromark(content);

  return { body };
};

export default mdProcessor;

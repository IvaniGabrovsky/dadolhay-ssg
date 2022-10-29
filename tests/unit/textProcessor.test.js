import path from 'path';
import { fileURLToPath } from 'url';
import textProcessor from '../../src/utils/processor/textProcessor';

/* eslint-disable no-underscore-dangle */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('text processor', () => {
  test('process text file to internal structure', () => {
    const testFileName = path.join(
      __dirname,
      '../../inputs/Sherlock-Holmes-Selected-Stories/Silver Blaze.txt'
    );

    expect(textProcessor(testFileName)).toMatchSnapshot();
  });
});

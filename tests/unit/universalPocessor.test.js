import path from 'path';
import { fileURLToPath } from 'url';
import processor from '../../src/utils/processor/processor';

/* eslint-disable no-underscore-dangle */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Universal processor', () => {
  test('process MD file to internal structure', () => {
    const mdFileName = path.join(__dirname, '../../inputs/testMarkdown.md');

    expect(processor(mdFileName)).toMatchSnapshot();
  });

  test('process text file to internal structure', () => {
    const testFileName = path.join(
      __dirname,
      '../../inputs/Sherlock-Holmes-Selected-Stories/Silver Blaze.txt'
    );

    expect(processor(testFileName)).toMatchSnapshot();
  });

  test('throw on unknown file type', () => {
    const testFileName = path.join(__dirname, '../../package.json');

    expect(() => processor(testFileName)).toThrow();
  });
});

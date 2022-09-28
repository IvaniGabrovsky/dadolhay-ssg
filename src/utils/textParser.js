const fs = require('fs');

const parseFileToBlocks = input => {
  const lines = fs.readFileSync(input, 'utf8').split(/\r?\n/);

  const blocks = [];

  // Each iteration of the following while should generate one block in blocks[]
  while (lines.length) {
    const blockContent = [];
    blockContent.push(lines.shift());

    // In case the file starts with \n
    if (!blockContent[0]) continue;

    // In case it's a hr block
    if (blockContent[0] === '---') {
      // IT's a **STANDALONE** line of three dashes so adding a hr is in order
      blocks.push({ type: 'hr' });
      continue;
    }

    // Collect all following lines that are not empty into the blockContent variable
    while (lines[0]?.match(/\w/)) {
      blockContent.push(lines.shift());
    }

    // Count number of empty lines following
    let emptyLines = 0;
    while (lines[0] === '') {
      lines.shift();
      emptyLines++;
    }

    if (!blocks.length && blockContent.length === 1 && emptyLines >= 2) {
      // This is a title
      blocks.push({ type: 'title', content: blockContent });
      continue;
    }

    // Determine block type based on the next line
    if (lines[0]?.match(/^=+$/)) {
      // The next line is wholey composed of "=" characters
      // Drop the next line
      lines.shift();
      // Save the block
      blocks.push({ type: 'h1', content: blockContent });
    } else if (lines[0]?.match(/^-+$/)) {
      // The next line is wholey composed of "-" characters
      // Drop the next line
      lines.shift();
      // Save the block
      blocks.push({ type: 'h2', content: blockContent });
    } else blocks.push({ type: 'paragraph', content: blockContent });
  }

  return blocks;
};

module.exports = { parseFileToBlocks };

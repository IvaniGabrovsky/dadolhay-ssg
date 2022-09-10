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

    // Collect all following lines that are not empty into the blockContent variable
    while (lines[0]) {
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

    blocks.push({ type: 'paragraph', content: blockContent });
  }

  return blocks;
};

module.exports = { parseFileToBlocks };

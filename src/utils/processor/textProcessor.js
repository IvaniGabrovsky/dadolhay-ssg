import fs from 'fs';

const textProcessor = input => {
  const lines = fs.readFileSync(input, 'utf8').split(/\r?\n/);

  let body = '';
  let title;

  // Each iteration of the following while should generate one block in blocks[]
  while (lines.length) {
    const blockContent = [];
    blockContent.push(lines.shift());

    // In case the file starts with \n
    if (!blockContent[0]) continue;

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

    if (!body.length && blockContent.length === 1 && emptyLines >= 2) {
      // This is a title
      body += `<h1>${blockContent.join('<br />')}</h1>\n`;
      title = blockContent;
      continue;
    }

    body += `<p>${blockContent.join('<br />')}</p>\n`;
  }

  return { body, title };
};

export default textProcessor;

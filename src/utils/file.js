const path = require('path');
const fs = require('fs');
const glob = require('glob-promise');

const destroypath = dir => {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
};

const generateFileListFromPath = ({ inputPath, outputPath }) => {
  if (!fs.existsSync(inputPath)) return [];

  if (fs.lstatSync(inputPath).isFile()) {
    // It's a file

    if (!inputPath.endsWith('.txt'))
      throw new Error(
        'When specifying a single file, it needs to be a txt file'
      );

    const filename = path.basename(inputPath);
    return [
      {
        input: path.resolve(inputPath),
        output: path.resolve(
          path.join(outputPath, filename.replace(/\.txt$/, '.html'))
        ),
      },
    ];
  }

  // It's a folder
  // Let's look up all the txt files recursively ... This returns relative urls
  return glob.sync(path.join(inputPath, '/**/*.txt')).map(item => {
    return {
      // Let's generate an absolute path for the input file
      input: path.resolve(item),
      // Combine the absolute path of the output folder with the
      // relative (compared to the path provided by the user) path of the input
      output: path.join(
        path.resolve(outputPath),
        path.relative(inputPath, item.replace(/\.txt$/, '.html'))
      ),
    };
  });
};

const writeFile = ({ output, content }) => {
  // Create directory if not already done
  const dir = path.dirname(output);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(output, content);
};

module.exports = { destroypath, generateFileListFromPath, writeFile };

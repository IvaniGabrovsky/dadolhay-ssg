const path = require('path');
const fs = require('fs');
const glob = require('glob-promise');

const generateFileListFromPath = ({ inputPath, outputPath }) => {
  if (!fs.existsSync(inputPath)) return [];

  if (fs.lstatSync(inputPath).isFile()) {
    // It's a file
    const filename = path.basename(inputPath);
    return [
      {
        input: path.resolve(inputPath),
        output: path.resolve(path.join(outputPath, filename)),
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
        path.relative(inputPath, item)
      ),
    };
  });
};

module.exports = { generateFileListFromPath };

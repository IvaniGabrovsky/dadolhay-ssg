const path = require('path');
const fs = require('fs');
const glob = require('glob-promise');
<<<<<<< HEAD
const { resolve } = require('path');
=======
>>>>>>> 51527bfe0d962dc893fac7c29e7ceb268f66b5ca

const destroypath = dir => {
  if (!fs.existsSync(dir)) return;

  if (fs.lstatSync(dir).isFile())
    throw new Error('The provided output path is a file');

  fs.rmSync(dir, { recursive: true });
};

const generateFileListFromPath = ({ inputPath, outputPath }) => {
  if (!fs.existsSync(inputPath)) return [];

  if (fs.lstatSync(inputPath).isFile()) {
    // It's a file

<<<<<<< HEAD
    if (!inputPath.endsWith('.txt') && !inputPath.endsWith('.md'))
      throw new Error(
        'When specifying a single file, it needs to be a "txt" or "md" file'
=======
    if (!inputPath.endsWith('.txt'))
      throw new Error(
        'When specifying a single file, it needs to be a txt file'
>>>>>>> 51527bfe0d962dc893fac7c29e7ceb268f66b5ca
      );

    const filename = path.basename(inputPath);
    return [
      {
        input: path.resolve(inputPath),
        output: path.resolve(
<<<<<<< HEAD
          path.join(
            outputPath,
            filename.replace(path.extname(filename), '.html')
          )
=======
          path.join(outputPath, filename.replace(/\.txt$/, '.html'))
>>>>>>> 51527bfe0d962dc893fac7c29e7ceb268f66b5ca
        ),
      },
    ];
  }

  // It's a folder
  // Let's look up all the txt files recursively ... This returns relative urls
<<<<<<< HEAD
  return glob.sync(path.join(inputPath, '/**/*')).map(item => {
    //Issue 6: Adding an or condition for the markdown extension
    if (
      path.basename(item).endsWith('.txt') ||
      path.basename(item).endsWith('.md')
    ) {
      return {
        // Let's generate an absolute path for the input file
        input: path.resolve(item),
        // Combine the absolute path of the output folder with the
        // relative (compared to the path provided by the user) path of the input
        output: path.join(
          path.resolve(outputPath),
          path.relative(inputPath, item.replace(path.extname(item), '.html'))
        ),
      };
    }
    //Issue 6: Returns blank if file is neither text or markdown
    else {
      return {
        input: '',
        output: '',
      };
    }
=======
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
>>>>>>> 51527bfe0d962dc893fac7c29e7ceb268f66b5ca
  });
};

const writeFile = ({ output, content }) => {
  // Create directory if not already done
  const dir = path.dirname(output);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(output, content);
};

module.exports = { destroypath, generateFileListFromPath, writeFile };

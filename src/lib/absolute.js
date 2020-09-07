const isAbsolute = require('is-absolute');
const path = require('path');

module.exports = inputPath => {
  const absolutePath = isAbsolute(inputPath)
    ? inputPath
    : path.resolve(process.cwd(), inputPath);

  return absolutePath;
};

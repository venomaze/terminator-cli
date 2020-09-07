const fs = require('fs-extra');

module.exports = async filePath => {
  const exists = fs.existsSync(filePath);

  if (!exists) {
    throw new Error(`'${filePath}' does not exist.`);
  }

  const stat = await fs.stat(filePath);
  const isFile = stat.isFile();

  if (!isFile) {
    throw new Error(`'${filePath}' is not a file.`);
  }
};

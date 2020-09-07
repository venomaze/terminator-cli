const fs = require('fs-extra');
const crypto = require('crypto');
const util = require('util');

const randomBytes = util.promisify(crypto.randomBytes);

module.exports = async (filePath, writeCallback) => {
  const stat = await fs.stat(filePath);
  const fileSize = stat.size;
  const bufferLength = 10240;

  let file = await fs.open(filePath, 'w');
  let position = 0;

  while (position < fileSize) {
    const requiredLength = Math.min(bufferLength, fileSize - position);
    const buffer = await randomBytes(requiredLength);
    const { bytesWritten } = await fs.write(
      file,
      buffer,
      0,
      requiredLength,
      position
    );

    if (bytesWritten !== requiredLength) {
      throw new Error('Lost data while overwriting.');
    }

    writeCallback(requiredLength);
    position += requiredLength;
  }

  await fs.close(file);
  file = null;
};

const fs = require('fs-extra');
const inquirer = require('inquirer');
const ProgressBar = require('progress');
const chalk = require('chalk');

const validate = require('../lib/validate');
const overwrite = require('../lib/overwrite');
const absolute = require('../lib/absolute');
const logger = require('../lib/logger');
const banner = require('../lib/banner');

module.exports = async (filePath, options) => {
  await banner();

  const absoluteFilePath = absolute(filePath);

  try {
    await validate(absoluteFilePath);
  } catch (err) {
    logger.error(err.message);
    return;
  }

  logger.warning(`Starting to remove ${absoluteFilePath}`);

  const { sure } = await inquirer.prompt([
    {
      name: 'sure',
      type: 'confirm',
      message: 'Are you sure you want to continue?',
    },
  ]);

  if (!sure) {
    logger.warning('Exiting the program...', true);
    return;
  }

  const stat = await fs.stat(absoluteFilePath);
  const fileSize = stat.size;
  const iterations =
    parseInt(options.iterations) && parseInt(options.iterations) > 0
      ? parseInt(options.iterations)
      : 3;

  logger.success('Starting to overwrite the file...\n', true);

  for (let i = 0; i < iterations; i++) {
    const bar = new ProgressBar(
      `${chalk.greenBright('[+]')} Iteration ${i + 1} [:bar] :percent :etas`,
      {
        complete: '#',
        incomplete: ' ',
        width: 20,
        total: fileSize,
      }
    );

    try {
      await overwrite(absoluteFilePath, writtenBufferLength => {
        bar.tick(writtenBufferLength);
      });
    } catch (err) {
      logger.error(err.message);
      return;
    }
  }

  console.log();
  logger.success('Finished overwriting the file.');

  try {
    await fs.unlink(absoluteFilePath);
    logger.success('Removed the file.');
  } catch (err) {
    logger.error(err.message);
  }
};

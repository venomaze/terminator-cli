const commander = require('commander');

const package = require('../package.json');

commander.version(package.version);

commander
  .command('remove <file>')
  .alias('rm')
  .description('Securely remove the given file')
  .option('-i, --iterations <number>', 'Number of overwriting iterations')
  .action(() => {});

module.exports = commander;

const figlet = require('figlet');
const chalk = require('chalk');
const util = require('util');

const figletText = util.promisify(figlet.text);

module.exports = async () => {
  const logo = await figletText('Terminator');
  const repo = 'https://github.com/venomaze/terminator-cli';

  console.log(chalk.redBright(logo));
  console.log(chalk.grey(`   |~> Developed by ${chalk.bold('Venomaze')}`));
  console.log(chalk.grey(`   |~> ${repo}\n`));
};

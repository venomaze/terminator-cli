const chalk = require('chalk');

module.exports = {
  success: (message, minimal) => {
    if (minimal) {
      console.log(`${chalk.greenBright('[+]')} ${message}`);
      return;
    }

    console.log(`${chalk.greenBright('[SUCCESS]')} ${message}`);
  },

  error: (message, minimal) => {
    if (minimal) {
      console.log(`${chalk.redBright('[-]')} ${message}`);
      return;
    }

    console.log(`${chalk.redBright('[ERROR]')} ${message}`);
  },

  warning: (message, minimal) => {
    if (minimal) {
      console.log(`${chalk.yellowBright('[!]')} ${message}`);
      return;
    }

    console.log(`${chalk.yellowBright('[WARNING]')} ${message}`);
  },
};

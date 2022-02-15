const inquirer = require('inquirer');
const path = require('path');

const baseConfig = {
   name: 'static-example',
   version: 2,
   builds: [
       {src: '*' , use: '@now/static'},
   ],
};

async function staticConfig(config) {

    const answers = await inquirer
    .prompt([
        {
            type: 'text',
            name: 'directory',
            message: 'what folder would you like to deploy?',
            default: '.',
        }
    ]);
    baseConfig.builds[0].src = path.join(answers.directory, '*');
  
    return {
        ...config,
        ...baseConfig,
    }
}

module.exports = staticConfig;
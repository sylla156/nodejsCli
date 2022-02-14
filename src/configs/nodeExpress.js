const inquirer = require('inquirer');


const baseConfig = {
    builds: [
        {
            src: 'src/index.js',
            use: '@now/node-server',
        },
    ],

    routes: [
        {src: '/.*', dest: 'src/index.js'},
    ],
};

async function nodeExpress(config) {
    let mainFile = 'src/index.js';

    try {
        // eslint-disable next line
        const file = (process.cwd() + '\\package.json');
        const packageJson = require(file);
        mainFile = packageJson.main;
    } catch (error) {   
        
    }
    const answers = await inquirer
    .prompt([
        {
            type: 'text',
            name: 'main',
            message: 'what is the path to your express entry point',
            default: mainFile,
        }
    ]);

    return {
        ...config,
        ...baseConfig,
    }
}

module.exports = nodeExpress;
const { promises } = require('fs');

async function run() {
    console.log('começando a escrever no arquivo...');
    const textFileName = 'final-message.txt';
    const text = `Essa mensagem é de extrema importância e foi gerada em: ${new Date().toISOString()}`;

    await promises.writeFile(textFileName, text);

    console.log('lendo conteúdo do arquivo: ', await (await promises.readFile(textFileName)).toString());
    console.log('terminando...');

}

module.exports = { run };
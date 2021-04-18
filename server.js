const { promises } = require('fs');

const express = require('express');
const app = express();
const port = 3000;

const cryptoApp = require('./src/app.js')
const CryptoHelper = require('./src/cryptoHelper.js');
const CustomFSPromises = require('./src/customFSPromises.js');
const Decorator = require('./src/decorator.js');

app.get('/', async (req, res) => {
    const { q } = req.query;

    if (q && q.trim()) {
        const textFileName = 'final-message.txt';
        await promises.writeFile(textFileName, q);    
        const content = (await promises.readFile(textFileName)).toString()
        res.send(`Foi gerado o arquivo <strong>${textFileName}</strong> com o conteúdo: <br/><br/> <code>${content}</code>`);
    } else {
        res.send(`Passe o <strong>param ?q</strong> com o texto requerido para continuar.`);
    }
})

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}...`)
});

;(async () => {
    const config = {
        cryptoKey: 'adler+coelho+santos@2021'
    }

    const cryptoHelper = await CryptoHelper.setup(config);
    const customFSPromises = new CustomFSPromises({ cryptoHelper }).configure();

    Decorator.decorateModule(customFSPromises, require('fs').promises)
})();
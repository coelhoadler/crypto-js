const app = require('./src/app.js')
const CryptoHelper = require('./src/cryptoHelper.js');
const CustomFSPromises = require('./src/customFSPromises.js');
const Decorator = require('./src/decorator.js');


;(async () => {
    const config = {
        cryptoKey: 'adler+coelho+santos@2021'
    }
    
    // const enc = await crypto.encrypt('Hello World');
    // const decrypto = await crypto.decrypt(enc);

    const cryptoHelper = await CryptoHelper.setup(config);
    const customFSPromises = new CustomFSPromises({ cryptoHelper }).configure();

    Decorator.decorateModule(customFSPromises, require('fs').promises)

    await app.run();
})()
let translations = require('./server_translations.json');

const getTranslation = (cookies, tranlsationName) => {
    return translations[tranlsationName][cookies?.language || "pl"];
}

module.exports = getTranslation;
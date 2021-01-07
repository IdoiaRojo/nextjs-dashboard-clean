const path = require('path')
require('dotenv').config()
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
    es: 'es'
}

module.exports = {
    rewrites: async () => nextI18NextRewrites(localeSubpaths),

    webpack: config => {
        config.resolve.alias['@'] = path.resolve(__dirname)
        return config;
    },
}

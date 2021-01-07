const NextI18Next = require('next-i18next').default
const path = require('path')

module.exports = new NextI18Next({
    otherLanguages: ['es'],
    defaultNS: 'common',
    localeSubpaths: {
      es: 'es'
    },
    localePath: path.resolve('./public/static/locales'),
})

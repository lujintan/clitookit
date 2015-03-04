module.exports = {
    plugin: [
        'wasai',
        'oo'
    ],
    cli: {
        'testb': {
            desc: 'test b',
            commands: ['wasai']
        },
        'testa': {
            desc: 'test a',
            commands: ['testb', 'oo.js']
        }
    }
};
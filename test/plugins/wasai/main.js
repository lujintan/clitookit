module.exports = function(PluginAPI){
    PluginAPI.register('wasai', 'the wasai desc', [{
        sample: '-o, --ok',
        desc: '试一试',
    }], function(){
        console.log('-------');
    });
};
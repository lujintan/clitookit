module.exports = function(PluginAPI){
    PluginAPI.register('oo', 'oo haha', [{
        sample: '-o, --ok',
        desc: 'let my try',
    }], function(){
        console.log('-------');
    });
};
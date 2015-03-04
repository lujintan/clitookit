module.exports = function(PluginAPI){
    PluginAPI.register('oo', 'oo haha', [{
        sample: '-o, --ok',
        desc: '试一试',
    }], function(){
        console.log('-------');
    });
};
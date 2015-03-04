var PluginAPI = require('./PluginAPI.js');
var Plugin = require('./Plugin.js');
var Util = require('./Util.js');
var Q = require('q');
var fs = require('fs');
var path = require('path');

//all plugins
var _pluginList = [];
var _pluginBase = 'plugins';

module.exports = {
    /**
     * weather the plugin is exist in plugin's list or not
     * @param  {String}  name the plugin's name
     * @return {Boolean}
     */
    isExist: function(name){
        for (var i = 0, len = _pluginList.length ; i < len ; i++){
            var plugin = _pluginList[i];
            if (name === plugin.name) {
                return true;
            }
        }
        return false;
    },

    /**
     * register the plugin
     * @param  {String} path the plugin's path
     * @return {void}
     */
    register: function(name, pa){
        var pa = pa || name;

        if (!this.isExist(name)){
            var realPath = path.join(_pluginBase, pa, 'main.js');
            var pluginReg;
            if (!fs.existsSync(realPath)) {
                pluginReg = require(pa);
            } else {
                pluginReg = require(fs.realpathSync(realPath));
            }

            _pluginList.push(new Plugin(name, pa, pluginReg));
            
            pluginReg(PluginAPI);
        }
    },

    /**
     * remove the plugin by name
     * @param  {String} name plugin's name
     * @return {void}
     */
    remove: function(name){
        for (var i = 0, len = _pluginList.length ; i < len ; i++){
            var plugin = _pluginList[i];
            if (name === plugin.name) {
                _pluginList.splice(i, 1);
                return;
            }
        }
    },

    /**
     * initial the plugins by plugin's config
     * @param  {Object} plugins plugin's config
     * @return {Promise}
     */
    init: function(plugins, pluginBase){
        var _this = this;
        
        if (typeof pluginBase === 'string') {
            _pluginBase = pluginBase;
        }
        plugins.forEach(function(plugin, index){
            var name;
            var path;
            if (typeof plugin === 'string'){
                name = plugin;
            } else {
                name = plugin.name;
                path = plugin.path;
            }
            _this.register(name, plugin);
        });
    }
};
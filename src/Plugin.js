var Plugin = function(name, path, cb){
    this.name = name;
    this.path = path;
    this.cb = cb;
};

Plugin.prototype.equal = function(plugin){
    return this.name === plugin.name;
};

module.exports = Plugin;
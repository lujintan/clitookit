var Q = require('q');
var Util = require('./Util.js');

var Command = function(name, desc, option, handler, children){
    this.name = name;
    this.desc = desc;
    this.option = option;
    this.handler = handler || Util.noop;
    this.children = children || [];
};

Command.prototype.exec = function() {
    var handlerReturn = this.handler(this);
    var _children = this.children;
    if (handlerReturn && handlerReturn.then){
        return handlerReturn.then(function(){
            return Util.arrForInPromise(_children, function(child, index){
                return child.exec();
            });
        });
    } else {
        return Util.arrForInPromise(_children, function(child, index){
            return child.exec();
        });
    }
};

Command.prototype.addChild = function(cmd) {
    this.children = this.children.concat(cmd);
};

module.exports = Command;
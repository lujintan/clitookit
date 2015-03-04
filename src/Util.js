var Q = require('q');

module.exports = {
    /**
     * object for ... in 
     * @param  {Object}   obj      Object
     * @param  {Function} callback callback function, 
     *                             when the function return false, stop traversaling.
     * @return {void}
     */
    objForIn: function (obj, callback){
        for (var key in obj){
            if (obj.hasOwnProperty(key)){
                if (callback(obj[key], key) === false) {
                    break;
                }
            }
        }
    },

    /**
     * traversal the array which callback function returns a object is type of promise
     * @param  {Array}   arr      array
     * @param  {Function} callback callback function
     * @param  {Number}   index    array's index
     * @param  {Defer}   deferred the array defer object
     * @return {Promise} promise
     */
    arrForInPromise: function(arr, callback, index, deferred){
        var _arrForInPromise = this.arrForInPromise;
        var index = index || 0;
        var deferred = deferred || Q.defer();

        if (typeof arr[index] !== 'undefined'){
            var cbReturn = callback(arr[index], index);

            if (cbReturn && !!cbReturn.then) {  //if return a promise object
                cbReturn.then(function(){
                    _arrForInPromise(arr, callback, ++index, deferred);
                });
            } else if (cbReturn === false) {  //stop traversaling array when return false
                deferred.resolve();
            } else {  //traversal the next item
                _arrForInPromise(arr, callback, ++index, deferred);
            }
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    },

    /**
     * an empty funtion
     * @return {void}
     */
    noop: function(){}
};
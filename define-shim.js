/**
 * By including this file, we can use RequireJS in the old style, without using
 * dependencies.
 * @param {String:Path} namespace
 * @param {[String:Path]} dependencies
 * @param {Function} module
 */
(function(global) {
    function getParentAndChild(modulePath) {
        var pathChunks = modulePath.split('/');
        var currentTop = global;
        for (var i = 0; i < pathChunks.length - 1; i++) {
            var pathChunk = pathChunks[i];
            if (!( pathChunk in currentTop)) {
                currentTop[pathChunk] = {};
            }
            currentTop = currentTop[pathChunk];
        }
        return {
            parent : currentTop,
            childName : pathChunks[pathChunks.length - 1]
        };
    }


    global.define = function define(namespace, dependencyNames, module) {
        var parentAndChild = getParentAndChild(namespace);
        var dependencies = [];
        for (var i = 0; i < dependencyNames.length; i++) {
            var dependency = getParentAndChild(dependencyNames[i]);
            dependencies[i] = dependency.parent[dependency.childName];
        }
        parentAndChild.parent[parentAndChild.childName] = module.apply(global, dependencies);
    };
})(this);

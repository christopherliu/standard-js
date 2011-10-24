if (!Utils)
    var Utils = {};
Utils.EndsWith = function(word, pattern) {
    return word.match(pattern + '$'); }
/**
Returns a random integer from min to max, inclusive
*/
Utils.GenerateRandomInteger = function(min, max) {
    return min+Math.floor(Math.random()*(max-min+1)); };
//Quick-and-dirty function to test if word is plural, not always accurate. Depends on EndsWith.
Utils.IsPlural = function(word) {
    return Utils.EndsWith(word, 's'); }
/**
Similar to Array.prototype.map construct, but for Objects. Only includes
properties of the object itself, and not its prototypes.
*/
Utils.ForEachOwnProperty = function(obj, testFunction) {
    for(var propertyName in obj) {
        if(obj.hasOwnProperty(propertyName)) {
            testFunction(propertyName, obj[propertyName]);
        }
    }
};
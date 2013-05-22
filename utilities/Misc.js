if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.utilities === "undefined")
	standard_library.utilities = {};
if ( typeof standard_library.utilities.Misc === "undefined")
	standard_library.utilities.Misc = {};

/**
 * Similar to Array.prototype.map construct, but for Objects. Only includes
 * properties of the object itself, and not its prototypes.
 * 
 * @deprecated use Object.keys()
 */
//Object/miscellaneous
standard_library.utilities.Misc.ForEachOwnProperty = function(obj, testFunction) {
	for ( var propertyName in obj) {
		if (obj.hasOwnProperty(propertyName)) {
			testFunction(propertyName, obj[propertyName]);
		}
	}
};

/**
 * Once condition is true, run action.
 */
//Miscellaneous/utils???
standard_library.utilities.Misc.Once = function (condition, action) {
	function wait() {
		if (condition()) {
			action();
		} else {
			setTimeout(wait, 60);
		}
	}
	wait();
};
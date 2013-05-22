if (!this.standard_library) {
	this.standard_library = {};
}
if (!standard_library.math) {
	standard_library.math = {};
}

/**
 * Sums the varlues of an array.
 */
if (!standard_library.math.sum)
	standard_library.math.sum = function(ar) {
		var a = 0;
		for (var i = 0; i < ar.length; i++) {
			a = a + ar[i];
		}
		return a;
	};

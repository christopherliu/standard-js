// PLURAL
module("standard_library.language.English");

test("Standard case", function() {
	result = standard_library.language.English.isPlural("teachers");
	ok(result, "teachers is plural is " + result);
});

test("Singular case", function() {
	result = standard_library.language.English.isPlural("teacher");
	ok(!result, "teacher is plural is " + result);
});

// CONJUGATE VERBS
test("Standard case, no change with singular",
		function() {
			result = standard_library.language.English.conjugateVerb("teacher",
					"eats");
			ok(result === "eats", "teacher eats becomes teacher " + result);
		});

test("Standard change with you", function() {
	result = standard_library.language.English.conjugateVerb("you", "eats");
	ok(result === "eat", "you eats becomes you " + result);
});

test("Are -> is change with they", function() {
	result = standard_library.language.English.conjugateVerb("they", "is");
	ok(result === "are", "they is becomes they " + result);
});

test("Does -> do with we", function() {
	result = standard_library.language.English.conjugateVerb("we", "does");
	ok(result === "do", "we does becomes we " + result);
});

test("Multiple word length subject",
		function() {
			result = standard_library.language.English.conjugateVerb(
					"the young girls", "is");
			ok(result === "are", "the young girls is becomes the young girls "
					+ result);
		});

test("Subject is not a string", function() {
	result = standard_library.language.English.conjugateVerb(4, "is");
	ok(result === undefined, "4 is becomes " + result);
});

test("Third person singular is not a string", function() {
	result = standard_library.language.English.conjugateVerb("the young girls",
			4);
	ok(result === undefined, "the young girls 4 becomes " + result);
});

test("Third person singular is not a third person singular, standard",
		function() {
			result = standard_library.language.English.conjugateVerb("you",
					"eat");
			ok(result === undefined, "you eat becomes " + result);
		});

test("Third person singular is not a third person singular, are", function() {
	result = standard_library.language.English.conjugateVerb("they", "are");
	ok(result === undefined, "they are becomes " + result);
});

test("Third person singular is not a third person singular, do", function() {
	result = standard_library.language.English.conjugateVerb("they", "do");
	ok(result === undefined, "we do becomes " + result);
});
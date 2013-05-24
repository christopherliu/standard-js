// ROLL DICE
module("standard_library.gaming.Dice");

var rollDice = standard_library.gaming.Dice.rollDice;
test("One standard die, no random function given", function() {
	die = rollDice(1, 6);
	result = die.getValue();
	ok(0 < result && result <= 6, "One 6-sided die generated " + result);
});

test("One 1-sided die, no random function given", function() {
	die = rollDice(1, 1);
	result = die.getValue();
	ok(result === 1, "One 1-sided die generated " + result);
});

test("Five 12-sided die, no random function given", function() {
	die = rollDice(5, 12);
	result = die.getValue();
	ok(0 < result && result <= 72, "Five 12-sided die generated " + result);
});

test("Random function given", function() {
	func = function() {
		return 0.999999;
	}
	die = rollDice(1, 6, func);
	result = die.getValue();
	ok(result === 6, "Random function which always return 0.999999 generated "
			+ result);
});

test("No dice, no random function given", function() {
	die = rollDice(0, 6);
	result = die.getValue();
	ok(result === 0, "No dice generated " + result);
});

test("No sides, no random function given", function() {
	die = rollDice(1, 0);
	result = die.getValue();
	ok(result === undefined, "One 0-sided die generated " + result);
});

test("Forced value, no random function given", function() {
	die = rollDice(5, 12);
	die.forceValue(1000);
	result = die.getValue();
	ok(result === 1000, "Forced-value die of 1000 generated " + result);
});

test("numDice is not a number", function() {
	result = rollDice("a", 6);
	ok(result === undefined, "numDice is 'a' results in " + result);
});

test("sides is not a number", function() {
	result = rollDice(1, "a");
	ok(result === undefined, "sides is 'a' results in " + result);
});

test("fnRandom is not a function", function() {
	func = 4;
	result = rollDice(1, 6, func);
	ok(result === undefined, "Incorrect random generator fnRandom results in "
			+ result);
});

// TODO addSubscriber (this is more of an integration test with Publisher)
// TODO getValue, forceValue, see

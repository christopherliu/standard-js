/**
 * @requires 	standard_library.math.Random
 * @requires	standard_library.utilities.ArrayUtils
 * @requires	standard_library.core.Publisher
 * @name 		standard_library.gaming.Dice
 * @namespace 	Provides dice functionality.
 */
if ( typeof standard_library === "undefined")
	var standard_library = {};
if ( typeof standard_library.gaming === "undefined")
	standard_library.gaming = {};
if ( typeof standard_library.gaming.Dice === "undefined")
	standard_library.gaming.Dice = {};

/**
 * Events: roll(ed), force(d), seen
 *
 * @class A single roll of the die.
 * @constructor
 * @param {Number}
 * 			sides	An integer number of sides the dice has.
 * @param {Function}
 *			fnRandom 	A replacement for the random function,
 * 					if we choose to seed.
 */
standard_library.gaming.Dice.DiceRoll = function(sides, fnRandom) {
	var self = this;
	var value;
	var publisher = new Publisher()
	
	/*
	 * @returns {Number} An integer of the dice value rolled.
	 */
	function _roll() {
		value = standard_library.math.Random.generateRandomInteger(1, sides, fnRandom);
		self.isForced = false;
		self.hasBeenSeen = false;
		publisher.notifySubscribers({
			"name" : "roll",
			"value" : value
		});
		return value;
	}

	_roll();
	/**
	 * Subscribers are notified whenever a dice is rerolled (roll event).
	 */
	this.addSubscriber = function(subscriber) {
		publisher.addSubscriber(subscriber);
		// TODO this shouldn't notify all old subscribers just because a new one
		publisher.notifySubscribers({
			"name" : "roll",
			"value" : value
		});
	};
	
	/**
	 * @param {Number}
	 * 			newValue
	 */
	this.forceValue = function(newValue) {
		if (typeof newValue !== "number")
			return undefined;
		value = newValue;
		self.isForced = true;
		publisher.notifySubscribers({
			"name" : "force",
			"value" : value
		});
	};
	
	/**
	 * @returns	{Number} The value of the dice as rolled.
	 */
	this.getValue = function() {
		return value;
	};
	/**
	 * Has someone seen the die yet?
	 */
	this.hasBeenSeen = false;
	this.isForced = false;
	
	/**
	 * Reroll the die to produce a new outcome.
	 */
	this.reroll = _roll;
	
	/**
	 * 
	 */
	this.see = function() {
		self.hasBeenSeen = true;
		publisher.notifySubscribers({
			"name" : "seen"
		});
	}
};

/**
 * @example To roll 2d6, reroll one die, and get the end result.
 * <code>
 * var myDie = Dice.RollDice(2,6);
 * myDie[0].reroll();
 * var mySpeedRoll = myDie.getValue();
 * </code>
 *
 * @param {Number}
 * 			numDice		The number of dice there are.
 * @param {Number}
 * 			sides		The number of sides each dice has.
 * @param {Function}
 *            random	A replacement for the random function, if we choose to seed.
 * @returns {Dice.DiceRollCollection} An array of DiceRolls, with additional methods getValue and forceValue.
 */
standard_library.gaming.Dice.rollDice = function(numDice, sides, random) {"use strict";
	var diceRolls = [];
	var overrideValue = false;
	for (var i = 0; i < numDice; i++) {
		diceRolls.push(new standard_library.gaming.Dice.DiceRoll(sides, random));
	}
	diceRolls.getValue = function() {
		return overrideValue || standard_library.math.Sum.sum(diceRolls.map(function(roll) {
			return roll.getValue();
		}));
	};
	diceRolls.forceValue = function(newValue) {
		overrideValue = newValue;
	};
	return diceRolls;
};

standard_library.gaming.Dice.testDice = function() {"use strict";
	var myDie = Dice.RollDice(2, 6);
	myDie[0].reroll();
	var mySpeedRoll = myDie.getValue();
	alert(mySpeedRoll);
};

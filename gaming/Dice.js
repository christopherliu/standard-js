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
 * @class A single roll of the die.
 * @constructor
 * @param {Number}
 * 			sides		An integer number of sides the dice has.
 * @param {Function}
 *			fnRandom 	A replacement for the random function,
 * 						if we choose to seed.
 *
 * Events: roll(ed), force(d), seen
 */
standard_library.gaming.Dice.DiceRoll = function(sides, fnRandom) {
	var self = this;
	var value;
	var publisher = new standard_library.core.Publisher()

	/*
	 * @returns {Number} An integer of the dice value rolled.
	 */
	function _roll() {
		value = standard_library.math.Random.generateRandomInteger(1, sides, fnRandom);
		self.hasBeenSeen = false;
		self.isForced = false;
		publisher.notifySubscribers({
			"name" : "roll",
			"value" : value
		});
		return value;
	}

	_roll();

	/**
	 * Subscribers are notified whenever a dice is rerolled (roll event).
	 *
	 * @param {Object}
	 * 			subscriber	A dictionary mapping the names of events
	 * 						to functions which respond to them.
	 */
	this.addSubscriber = function(subscriber) {
		// TODO this shouldn't notify all old subscribers just because a new one
		publisher.addSubscriber(subscriber);
		publisher.notifySubscribers({
			"name" : "roll",
			"value" : value
		});
	};

	/**
	 * @returns	{Number} The value of the dice.
	 */
	this.getValue = function() {
		return value;
	};

	/**
	 * Take a value and set it to be the new value forcefully
	 *
	 * @param {Number}
	 * 			newValue	The value the dice rolls are to be forced to be.
	 */
	this.forceValue = function(newValue) {
		value = newValue;
		self.isForced = true;
		publisher.notifySubscribers({
			"name" : "force",
			"value" : value
		});
	};
	
	// Has someone seen the die yet?
	this.hasBeenSeen = false;
	this.isForced = false;
	
	// Reroll the die to produce a new outcome.
	this.reroll = _roll;
	
	/**
	 * Marks the subscribers as seen.
	 */
	this.see = function() {
		self.hasBeenSeen = true;
		publisher.notifySubscribers({
			"name" : "seen"
		});
	};
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
standard_library.gaming.Dice.rollDice = function(numDice, sides, fnRandom) {"use strict";
	var diceRolls = [];
	var overrideValue = false;
	if ( typeof numDice !== "number" || typeof sides !== "number" || (fnRandom && typeof fnRandom !== "function"))
		return undefined;
	for (var i = 0; i < numDice; i++) {
		diceRolls.push(new standard_library.gaming.Dice.DiceRoll(sides, fnRandom));
	}

	/**
	 * @returns {Number} The sum of the dice rolls if there is not a forced value.
	 */
	diceRolls.getValue = function() {
		return overrideValue || standard_library.utilities.ArrayUtils.sum(diceRolls.map(function(roll) {
			return roll.getValue();
		}));
	};
	diceRolls.forceValue = function(newValue) {
		overrideValue = newValue;
	};
	return diceRolls;
};
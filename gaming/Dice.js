/**
 * Dependencies: Utils, Math, Publisher
 */
if (!this.standard_library) {
	this.standard_library = {};
}
if (!standard_library.gaming) {
	standard_library.gaming = {};
}
/**
 * Events: roll(ed), force(d), seen
 * 
 * @class A single roll of the die.
 * @constructor
 * @param {Function}
 *            random A replacement for the random function, if we choose to
 *            seed.
 */
standard_library.gaming.Dice.DiceRoll = function(sides, random) {
	var self = this;
	var value;
	var publisher = new Publisher();

	function _roll() {
		value = Utils.GenerateRandomInteger(1, sides, random);
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
	this.forceValue = function(newValue) {
		value = newValue;
		self.isForced = true;
		publisher.notifySubscribers({
			"name" : "force",
			"value" : value
		});
	};
	/**
	 * Get the value of the die as rolled.
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
	 * Reroll the die to produce a new outcome. Returns outcome for reference.
	 */
	this.reroll = _roll;
	this.see = function() {
		self.hasBeenSeen = true;
		publisher.notifySubscribers({
			"name" : "seen"
		});
	}
};
/**
 * @returns An array of DiceRolls, with additional methods getValue and
 *          forceValue.
 * 
 * @example <code>
 //To roll 2d6, reroll one die, and get the end result.
 var myDie = Dice.RollDice(2,6);
 myDie[0].reroll();
 var mySpeedRoll = myDie.getValue();
 </code>
 * @param {Function}
 *            random A replacement for the random function, if we choose to
 *            seed.
 * @version NewDice
 * @returns {Dice.DiceRollCollection}
 */
standard_library.gaming.Dice.RollDice = function(numberOfDice, sides, random) {
	var diceRolls = [];
	var overrideValue = false;
	for ( var i = 0; i < numberOfDice; i++) {
		diceRolls.push(new Dice.DiceRoll(sides, random));
	}
	diceRolls.getValue = function() {
		return overrideValue || Math.sum(diceRolls.map(function(roll) {
			return roll.getValue();
		}));
	};
	diceRolls.forceValue = function(newValue) {
		overrideValue = newValue;
	};
	return diceRolls;
};
standard_library.gaming.Dice.TestDice = function() {
	var myDie = Dice.RollDice(2, 6);
	myDie[0].reroll();
	var mySpeedRoll = myDie.getValue();
	alert(mySpeedRoll);
};
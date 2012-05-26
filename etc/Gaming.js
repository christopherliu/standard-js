/**
 * Dependencies: Utils, Math, Publisher
 */
if (!Gaming)
	var Gaming = {};
/**
 * @class A single roll of the die.
 * @constructor
 */
Gaming.DiceRoll = function(sides) {
	var value;
	var publisher = new Publisher();
	
	function _roll() {
		value = Utils.GenerateRandomInteger(1, sides);
		publisher.notifySubscribers({ "name": "roll", "value": value });
		return value;
	}

	_roll();
	/**
	 * Subscribers are notified whenever a dice is rerolled (roll event).
	 */
	this.addSubscriber = function(subscriber) {
		publisher.addSubscriber(subscriber);
		publisher.notifySubscribers({ "name": "roll", "value": value });
	};
	/**
	 * Get the value of the die as rolled.
	 */
	this.getValue = function() {
		return value;
	};
	/**
	 * Reroll the die to produce a new outcome. Returns outcome for reference.
	 */
	this.reroll = _roll;
};
/**
 * @returns An array of DiceRolls, with additional methods getValue and
 *          forceValue.
 * 
 * @example <code>
 //To roll 2d6, reroll one die, and get the end result.
 var myDie = Gaming.RollDice(2,6);
 myDie[0].reroll();
 var mySpeedRoll = myDie.getValue();
 </code>
 * @version NewDice
 */
Gaming.RollDice = function(numberOfDice, sides) {
	var diceRolls = [];
	var overrideValue = false;
	for ( var i = 0; i < numberOfDice; i++) {
		diceRolls.push(new Gaming.DiceRoll(sides));
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
Gaming.TestDice = function() {
	var myDie = Gaming.RollDice(2, 6);
	myDie[0].reroll();
	var mySpeedRoll = myDie.getValue();
	alert(mySpeedRoll);
};
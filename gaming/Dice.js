define('standard_library/gaming/Dice', ['standard_library/core/Publisher', 'standard_library/math/Random', 'standard_library/utilities/ArrayUtils', 'seedrandom'], function(Publisher, Random, ArrayUtils) {"use strict";
    /**
     * @requires    standard_library.math.Random
     * @requires    standard_library.utilities.ArrayUtils
     * @requires    standard_library.core.Publisher
     * @requires    seedrandom.js (https://github.com/davidbau/seedrandom)
     * @namespace   Dice rolling functions
     */
    var _this = {
        /**
         * @class A single roll of the die.
         * @constructor
         * @param {Number}
         *          sides       The number of sides the dice has.
         * @param {Function}
         *          fnRandom    A replacement for the random function,
         *                      if we choose to seed.
         *
         * Events: roll(ed), force(d), seen
         */
        "DiceRoll" : function(sides, fnRandom) {
            // -----------------------------------------------------------------
            //Local state
            var _this = this;
            var publisher = {};
            Publisher.call(this, publisher);
            var addSubscriber = this.addSubscriber;
            var value;

<<<<<<< HEAD
            // -----------------------------------------------------------------
            //Public state
            // Has someone seen the die yet?
            this.hasBeenSeen = false;
            this.isForced = false;
            this.timesRolled = 0;
=======
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
    var publisher = {};
    standard_library.core.Publisher.call(this, publisher);
>>>>>>> 814fb27aa6bfde83d78e0f750e93aceb814bbba0

            // -----------------------------------------------------------------
            //Private functions
            /*
             * @returns {Number} An integer of the dice value rolled.
             */
            function _roll() {
                value = Random.generateRandomInteger(1, sides, fnRandom);
                _this.hasBeenSeen = false;
                _this.isForced = false;

                if (_this.timesRolled > 0) {
                    publisher.notifySubscribers({
                        "name" : "reroll"
                    });
                }
                publisher.notifySubscribers({
                    "name" : "roll",
                    "value" : value
                });
                _this.timesRolled += 1;
                return value;
            }

            // -----------------------------------------------------------------
            //Public functions
            /**
             * Subscribers are notified whenever a dice is rerolled (roll event).
             *
             * @param {Object}
             *          subscriber  A dictionary mapping the names of events
             *                      to functions which respond to them.
             */
            this.addSubscriber = function(subscriber) {
                // TODO this shouldn't notify all old subscribers just because a
                // new
                // one
                addSubscriber(subscriber);
                publisher.notifySubscribers({
                    "name" : "roll",
                    "value" : value
                });
            };
            /**
             * Force the dice to take a new value.
             *
             * @param {Number}
             *          newValue    The value the dice rolls are to be forced to
             * be.
             */
            this.forceValue = function(newValue) {
                value = newValue;
                _this.isForced = true;
                publisher.notifySubscribers({
                    "name" : "force",
                    "value" : value
                });
            };
            /**
             * @returns {Number} The value of the dice.
             */
            this.getValue = function() {
                return value;
            };
            // Reroll the die to produce a new outcome.
            this.reroll = _roll;
            /**
             * Marks the subscribers as seen.
             */
            this.see = function() {
                _this.hasBeenSeen = true;
                publisher.notifySubscribers({
                    "name" : "seen"
                });
            };

            // -----------------------------------------------------------------
            //Initialization
            _roll();
        },
        //standard_library.gaming.Dice.DiceRoll

        /**
         * @example To roll 2d6, reroll one die, and get the end result.
         * <code>
         * var myDie = Dice.rollDice(2,6);
         * myDie[0].reroll();
         * var mySpeedRoll = myDie.getValue();
         * </code>
         *
         * @param {Number}
         *          numDice     The number of dice there are.
         * @param {Number}
         *          sides       The number of sides each dice has.
         * @param {Number|Function} randomizer  Optional. Either a seed for the
         * internal
         * dice random function, or a replacement for the random function.
         * @returns {Dice.DiceRollCollection} An array of DiceRolls, with
         * additional methods getValue and forceValue.
         */
        "rollDice" : function(numDice, sides, randomizer) {"use strict";
            if ( typeof numDice !== "number" || typeof sides !== "number" || (randomizer && typeof randomizer !== "function" && typeof randomizer !== "number"))
                throw new Error("numDice and sides should be numbers, randomizer should be seed number or function.");

            // -----------------------------------------------------------------
            //Private variables
            var diceRolls = [];
            var fnRandom = false;
            var overrideValue = false;
            var publishingMethodAccessor = {};
            Publisher.call(diceRolls, publishingMethodAccessor);

            // -----------------------------------------------------------------
            //Public functions
            /**
             * @returns {Number} The sum of the dice rolls if there is not a
             * forced
             * value.
             */
            diceRolls.getValue = function() {
                return overrideValue || ArrayUtils.sum(diceRolls.map(function(roll) {
                    return roll.getValue();
                }));
            };
            diceRolls.forceValue = function(newValue) {
                overrideValue = newValue;
                publishingMethodAccessor.notifySubscribers({
                    "name" : "overrideValue"
                });
            };

            // -----------------------------------------------------------------
            //Initialization
            if (randomizer) {
                if ( typeof randomizer === "function") {
                    fnRandom = randomizer;
                } else {
                    if (!("srandom" in Math) && "seedrandom" in Math)
                        Math.seedrandom(randomizer);
                    if ("srandom" in Math)
                        fnRandom = Math.srandom;
                }
            }

            for (var i = 0; i < numDice; i++) {
                diceRolls.push(new _this.DiceRoll(sides, fnRandom));
            }
            return diceRolls;
        }
    };
    return _this;
});

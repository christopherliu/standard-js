if (!Gaming)
    var Gaming = {};
/**
@class A single roll of the die.
@version NewDice
*/
Gaming.DiceRoll = function(sides) {
    var value;
    function _roll() {
        value = Utils.GenerateRandomInteger(1, sides);
        return value;
    }
    
    _roll();
    /**
    Reroll the die to produce a new outcome. Returns outcome for reference.
    */
    this.reroll = _roll;
    /**
    Get the value of the die as rolled.
    */
    this.getValue = function() {
        return value;
    };
};
/**
Returns an array of DiceRolls, with an additional method getValue
@example
//To roll 2d6, reroll one die, and get the end result.
var myDie = Gaming.RollDice(2,6);
myDie[0].reroll();
var mySpeedRoll = myDie.getValue();
@version NewDice
*/
Gaming.RollDice = function(numberOfDice, sides) {
    var diceRolls = [];
    for(var i = 0; i < numberOfDice; i++) {
        diceRolls.push(new Gaming.DiceRoll(sides));
    }
    diceRolls.getValue = function() {
        return sum($.map(diceRolls, function(roll) { return roll.getValue(); }));
    };
    return diceRolls;
};
Gaming.TestDice = function() {
    var myDie = Gaming.RollDice(2,6);
    myDie[0].reroll();
    var mySpeedRoll = myDie.getValue();
    alert(mySpeedRoll);
};
Gaming.TestDice();
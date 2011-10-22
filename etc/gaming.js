if (!Gaming)
    var Gaming = {};
/**
@class A single roll of the die.
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
}
/**
Returns an array of DiceRolls.
@example
//To roll 1d6
Gaming.RollDice(1,6)
*/
Gaming.RollDice = function(numberOfDice, sides) {
    var diceRolls = [];
    for(var i = 0; i < numberOfDice; i++) {
        diceRolls.push(new Gaming.DiceRoll(sides));
    }
    return diceRolls;
}
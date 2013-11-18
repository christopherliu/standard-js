define('standard_library/core/Event', [], function() {"use strict";
    /**
     * @name standard_library.core.Event
     * @constructor
     * @param {Object}
     *            attachTo Optional shorthand. Makes attachTo[eventName] map to
     *            Event.Set.
     * @returns An Event object that can be bound.
     * @formatter:off
     * @example <code>
function Button() {
    var onClick = new standard_library.core.Event("OnClick", this);
    this.simulateClick = function() {
        onClick.Call();
    };
}
var btn = new Button();
btn.OnClick(function() {
    alert('button was clicked');
});
btn.simulateClick();
 </code>
 */
//@formatter:on
    return function Event(eventName, attachTo) {
        if (!(this instanceof Event)) {
            return new Event(eventName, attachTo);
        }
        var _eventHandler = null;
        var _isLoggingEnabled = ( typeof DEBUG !== 'undefined');
        this.Call = function() {
            if (_eventHandler) {
                if (_isLoggingEnabled) {
                    console.log("Event: " + eventName + "(" + Array.prototype.join(arguments, [","]) + ")");
                    // Find way to do universally.
                }
                return _eventHandler.apply(this, arguments);
            }
        };
        this.Set = function(handler) {
            _eventHandler = handler;
        };
        if (attachTo) {
            attachTo[eventName] = this.Set;
        }
    };
});

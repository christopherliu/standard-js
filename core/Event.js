/**
 * @name standard_library.core.Event
 * @namespace Provides information on events.
 */
if ( typeof standard_library === "undefined")
    var standard_library = {};
if (!standard_library.core)
    standard_library.core = {};
/**
 * @param {Object}
 *            attachTo Optional shorthand. Makes attachTo[eventName] map to
 *            Event.Set.
 * @returns An Event object that can be bound.
 * @formatter:off
 * @example <code>
function Button() {
	var onClick = new Event("OnClick", this);
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
standard_library.core.Event = function(eventName, attachTo) {
    if (!(this instanceof standard_library.core.Event)) {
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
}
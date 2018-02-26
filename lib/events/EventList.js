const Event = require("./Event").Event;

function EventList(registry) {
    this.registry = registry;
    this.events = [];
}

EventList.prototype.add = function(name) {
    const event = new Event(name, null);
    if (this.events.find((e) => e.name === event.name)) return;
    this.events.push(event);
    return this;
};

EventList.prototype.set = function(name, value) {
    this.events.forEach((event) => {
        if (event.name === name) {
            if (event.data !== value) {
                event.data = value;
                this.registry.notifyAllHandlers(event);
            }
        }
    });
};

exports.EventList = EventList;

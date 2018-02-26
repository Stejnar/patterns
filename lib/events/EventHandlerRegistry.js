const EventHandler = require("./EventHandler").EventHandler;

exports.EventHandlerRegistry = function() {
    this.handlers = [];
    this.registerEventHandler = function (name, listener) {
        const handler = new EventHandler(name, listener);
        if (this.handlers.find((h) => h.name === handler.name)) return;
        this.handlers.push(handler);
        return () => {
            const index = this.handlers.findIndex((h) => h.name === handler.name);
            if (index !== -1) this.handlers.splice(index, 1);
        };
    };
    this.notifyAllHandlers = function (event) {
        this.handlers.forEach((handler) => {
            if (handler.name === event.name) handler.listener(event.data);
        });
    };
};




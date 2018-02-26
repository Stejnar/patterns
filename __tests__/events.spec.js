const {EventHandlerRegistry, EventList} = require('../index');

let registry, emitter, receiver;

beforeAll(() => {
    registry = new EventHandlerRegistry();
    function Emitter() {
        this.list = new EventList(registry);
        this.list.add('message');
    }

    function Receiver() {
        this.message = null;
        registry.registerEventHandler('message', (data) => {
            this.message = data;
        });
    }
    emitter = new Emitter();
    receiver = new Receiver();
});

test('Message from Emitter to Receiver', () => {
    const message = 'hello receiver!';
    expect(receiver.message).toBeNull();

    emitter.list.set('message', message);
    expect(receiver.message).toEqual(message);
});
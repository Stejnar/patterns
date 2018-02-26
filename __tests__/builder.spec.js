const {BuilderFactory} = require('../lib/builder/BuilderFactory');

class Dog {
    constructor(builder) {
        this.head = builder.head;
        this.legs = builder.legs;
        this.voice = builder.voice;
    }
    bark() {
        return this.voice;
    }
    static get Builder() {
        return BuilderFactory(this, ['head', 'legs', 'voice']);
    }
}

test('BuilderFactory Test', () => {
    let dog = new Dog.Builder()
        .withHead(1)
        .withLegs(4)
        .withVoice('Wuff Wuff!!')
        .build();

    expect(dog.bark()).toEqual('Wuff Wuff!!');
});
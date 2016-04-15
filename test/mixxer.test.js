import test from 'tape';
import mixxer from '../src/mixxer';

test('extend from one object', (assert) => {
  mixxer.extend(Person, Mover);

  assert.doesNotThrow(callExtendedMethodsOnPerson, 'methods should be assigned properly.');
  assert.end();
});

test('extend one object literal ({}) from a function', (assert) => {
  mixxer.extend(SomeObject, Mover);

  assert.doesNotThrow(callExtendedMethodsOnSomeObject, 'methods should be assigned properly.');
  assert.end();
});

test('extend from several objects', (assert) => {
  mixxer(Truck)
    .extendFrom(Vehicle)
    .extendFrom(Mover, 'moveForward', 'moveLeft', 'moveRight');

  assert.doesNotThrow(callExtendedMethodsOnTruck, 'methods should be assigned properly.');
  assert.throws(callNotExtendedMethodsOnTruck, 'moveBackWard method should not be assigned.');
  assert.end();
});

function callExtendedMethodsOnPerson() {
  const modesto = new Person('Modesto', 'Figuereo');
  modesto.moveForward();
  modesto.moveBackWard();
  modesto.moveRight();
  modesto.moveLeft();
}

function callExtendedMethodsOnTruck() {
  const truck = new Truck('E02-5FU', 'red');
  truck.moveForward();
  truck.moveRight();
  truck.moveLeft();
  truck.accelerate();
  truck.brake();
}

function callNotExtendedMethodsOnTruck() {
  const truck = new Truck('E02-5FU', 'red');
  truck.moveBackWard();
}

function callExtendedMethodsOnSomeObject() {
  SomeObject.moveForward();
  SomeObject.moveBackWard();
  SomeObject.moveRight();
  SomeObject.moveLeft();
}

const SomeObject = {};

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

function Truck(plate, color) {
  this.plate = plate;
  this.color = color;
}

function Vehicle() {}

Vehicle.prototype = {
  accelerate() {
    console.log('accelerating...');
  },
  brake() {
    console.log('braking...');
  },
};

function Mover() {}

Mover.prototype = {
  moveForward() {
    console.log('moving forward');
  },
  moveBackWard() {
    console.log('move backward');
  },
  moveRight() {
    console.log('move right');
  },
  moveLeft() {
    console.log('move left');
  },
};

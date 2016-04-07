import test from 'tape';
import mixxer from '../src/mixxer';

test('extend from one object', function(assert) {
  mixxer.extend(Person, Mover);

  assert.doesNotThrow(executeMoverMethodsOnPersonObject, 'methods should be assigned properly.');
  assert.end();
});

test('extend from several objects', function(assert) {
  mixxer(Truck)
    .extendFrom(Vehicle)
    .extendFrom(Mover, 'moveForward', 'moveLeft', 'moveRight');

  assert.doesNotThrow(executeVehicleAndMoverMethodsOnTruckObject, 'methods should be assigned properly.');
  assert.throws(executeNotExtendedMoverMethodsOnTruckObject, 'moveBackWard method should not be assigned.');
  assert.end();
});

function executeMoverMethodsOnPersonObject() {
  const modesto = new Person('Modesto', 'Figuereo');
  modesto.moveForward();
  modesto.moveBackWard();
  modesto.moveRight();
  modesto.moveLeft();
}

function executeVehicleAndMoverMethodsOnTruckObject() {
  const truck = new Truck('E02-5FU', 'red');
  truck.moveForward();
  truck.moveRight();
  truck.moveLeft();
  truck.accelerate();
  truck.brake();
}

function executeNotExtendedMoverMethodsOnTruckObject() {
  const truck = new Truck('E02-5FU', 'red');
  truck.moveBackWard();
}

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
  accelerate: function() {
    console.log('accelerating...');
  },
  brake: function() {
    console.log('braking...');
  },
};

function Mover() {}
Mover.prototype = {
  moveForward: function() {
    console.log('moving forward');
  },
  moveBackWard: function() {
    console.log('move backward');
  },
  moveRight: function() {
    console.log('move right');
  },
  moveLeft: function() {
    console.log('move left');
  },
};

function extend(receiver, giver, ...whitelist) {
  let predicate = null;

  if (whitelist.length !== 0) {
    predicate = (property) => whitelist.indexOf(property) !== -1;
  } else {
    predicate = not((property) => Object.hasOwnProperty(receiver.prototype, property));
  }

  Object.keys(giver.prototype)
    .filter(predicate)
    .forEach(property => {
      receiver.prototype[property] = giver.prototype[property];
    });
}

function not(expression) {
  return (...args) => !expression.apply(this, args);
}

export default extend;

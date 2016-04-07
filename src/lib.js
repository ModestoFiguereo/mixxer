function extend(receiver, giver) {
  const whitelist = [].slice.apply(arguments, [2]);
  const isNotWhitelistEmpty = not(isWhitelistEmpty);

  let predicate = null;
  if (isNotWhitelistEmpty(whitelist)) {
    predicate = isInWhitelist(whitelist);
  } else {
    predicate = not(hasOwnProperty(receiver));
  }

  Object.keys(giver.prototype)
    .filter(predicate)
    .forEach(property => {
      receiver.prototype[property] = giver.prototype[property];
    });
}

function not(expression) {
  return function() {
    return !expression.apply(this, arguments);
  };
}

function isWhitelistEmpty(whitelist) {
  return whitelist.length === 0;
}

function isInWhitelist(whitelist) {
  return function(property) {
    return whitelist.indexOf(property) !== -1;
  };
}

function hasOwnProperty(object) {
  return function(property) {
    return Object.hasOwnProperty(object.prototype, property);
  };
}

export default extend;

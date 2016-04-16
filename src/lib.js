function extend(receiver, giver, ...whitelist) {
  let predicate = null;
  if (whitelist.length !== 0) {
    predicate = (property) => whitelist.indexOf(property) !== -1;
  } else {
    predicate = not((property) => hasOwnProperty(receiver, property));
  }

  const properties = keys(giver).filter(predicate);
  if (isFunction(receiver)) {
    if (isFunction(giver)) {
      each(properties, (property) => {
        receiver.prototype[property] = giver.prototype[property];
      });
    } else {
      each(properties, (property) => {
        receiver.prototype[property] = giver[property];
      });
    }
  } else {
    if (isFunction(giver)) {
      each(properties, (property) => {
        receiver[property] = giver.prototype[property];
      });
    } else {
      each(properties, (property) => {
        receiver[property] = giver[property];
      });
    }
  }
}

function hasOwnProperty(object, property) {
  if (isFunction(object)) {
    return Object.hasOwnProperty(object, property);
  }

  return Object.hasOwnProperty(object.prototype, property);
}

function keys(object) {
  if (!object) return [];

  if (isFunction(object)) {
    return Object.keys(object.prototype);
  }

  return Object.keys(object);
}

function isFunction(object) {
  return typeof object === 'function';
}

function not(expression) {
  return (...args) => !expression.apply(this, args);
}

function each(collection, callback) {
  for (const item of collection) {
    callback(item);
  }
}

export default extend;

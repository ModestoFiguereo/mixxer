function extend(receiver, giver, ...whitelist) {
  const isInWhiteList = partial(isInArray, whitelist);
  const doesReceiverNotHasProperty = negate(partial(hasOwnProperty, receiver));
  const predicate = not(isArrayEmpty, whitelist) ? isInWhiteList : doesReceiverNotHasProperty;

  const r = isFunction(receiver) ? receiver.prototype : receiver;
  const g = isFunction(giver) ? giver.prototype : giver;
  each(keys(giver).filter(predicate), (property) => {
    r[property] = g[property];
  });

  return receiver;
}

function partial(fn, ...args) {
  return (...moreArgs) => fn.apply({}, args.concat(moreArgs));
}

function negate(fn) {
  return (...args) => !fn.apply(this, args);
}

function not(fn, ...args) {
  return !fn.apply({}, args);
}

function each(collection, callback) {
  for (const item of collection) {
    callback(item);
  }
}

function isArrayEmpty(array) {
  return array.length === 0;
}

function isInArray(array, item) {
  return array.indexOf(item) !== -1;
}

function hasOwnProperty(object, property) {
  if (isFunction(object)) {
    return Object.hasOwnProperty(object.prototype, property);
  }

  return Object.hasOwnProperty(object, property);
}

function keys(object) {
  if (isFunction(object)) {
    return Object.keys(object.prototype);
  }

  return Object.keys(object || {});
}

function isFunction(object) {
  return typeof object === 'function';
}

export default extend;

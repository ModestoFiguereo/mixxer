import extend from './lib';

function mixxer(receiver) {
  return {
    extendFrom(giver, ...whitelist) {
      const args = [receiver, giver].concat(whitelist);
      extend.apply(this, args);

      return this;
    },
    ship() {
      return receiver;
    },
  };
}

mixxer.extend = extend;

export default mixxer;

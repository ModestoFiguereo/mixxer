import extend from './lib';

function mixxer(Base) {
  return {
    extendFrom(Mixin, ...whitelist) {
      const args = [Base, Mixin].concat(whitelist);
      extend.apply(this, args);

      return this;
    },
  };
}

mixxer.extend = extend;

export default mixxer;

import extend from './lib';

function mixxer(Base) {
  return {
    extendFrom: function(Mixin) {
      const args = [Base, Mixin].concat([].slice.apply(arguments, [1]));
      extend.apply(this, args);

      return this;
    },
  };
}

mixxer.extend = extend;

export default mixxer;

# Mixxer
This package allows you to implement the Mixin design pattern, extend one object from other objects.

## Install
`npm install mixxer --save`

## It's easy to use
`const mixxer = require('mixxer');`;

#### Extend from one object
`mixxer.extend(Programmer, Person)`

#### Extend from several objects
```js
mixxer(Programmer)
 .extendFrom(Person,)
 .extendFrom(Employ)
 .extendFrom(SalsaDancer);
```

#### You can specify what properties to extend
`mixxer.extend(Programmer, Person, 'breathe', 'walk')`

```js
mixxer(Programmer)
 .extendFrom(Person, 'breathe', 'walk')
 .extendFrom(Employ)
 .extendFrom(SalsaDancer);
```

---
title: "JS Deep Copy vs Shallow Copy"
spoiler: "Deep Copy and Shallow Copy"
date: "2020-03-29"
---

What is Deep Copy and what is different with shallow copy?

```js
const myObject = {
  a: "Hello",
  b: {
    c: "World",
  },
}
```

I defined the object called "myObject".
I will copy that object to another variable.

```js
const myCopiedObject = {
  ...myObject,
}
```

I used spread operator to copy original object.
So "myCopiedObject" has same structure and same variables with "myObject".

Let's see next codes.

```js
myCopiedObject.a = "Bye"
myCopiedObject.b.c = "Mars"
```

---Result---

```js
console.log(myObject)
```

```json
{
  "a": "Hello",
  "b": {
    "c": "Mars"
  }
}
```

So, we can figure out hierarchical object's elements are copied itself because "myObject"'s element "c" was changed.

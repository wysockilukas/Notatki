# Classes

```js
class Person {
    name = "Imm"
    call = () => {}
}
```

Przyklad klasy i dziedziczenia  

```js
class Human {
  constructor(gender) {
    this.gender = gender
  }
  printGender() {
    console.log(this.gender)
  }  
}

class Person extends Human {
  constructor(name, gender) {
    super(gender)
    this.name = name
  }
  printName() {
    console.log(this.name)
  }
}

const p1 = new Person("dsd", "facet")
p1.printName()
p1.printGender()
```

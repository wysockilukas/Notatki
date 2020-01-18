# Spread operator

To opertator ...  
Rozbija tablice lub obiekt na skłądowe  
A gdy jest arguemntem funkcji, to oznacz ze do funkcji można pzrekaza wiele wartości i one wszytkie zostana polczone w jedną tablicę  
To nam pozwala tworzyć kopie obiektu, a nie poner do niego  

```js
const arrOld = [1,2,3,4]
const arrNew = [...arrOld, 5,6,7,8]
console.log(arrNew)

const objOld = {
  name: "Imie"
}
const objNew = {...objOld, age:67}
console.log(objNew)


function sortArgs(...args) {
  return args.sort()
}
console.log(sortArgs(4,6,8,2,3,5,7))
```

# Export import

Możemy importować do pliku js, inny plik.js  
Są dwa rodzaje exportu: default i named  
I różnie się je importuje  

```js
//plik person.js
const person = {
    name: "Imie"
}
export default person //ten obiekt jest dostepny do eksportu
```

```js
//plik utility.js
export const cleaqn = () => {}
export const baseData = 10;
```

Importuemy te pliki do app.js  

```js
//plik app.js
import person from './person.js'
//import prs from '.person.js'

import {baseData} from './utility.js'
import {baseData, clean} from './utility.js'
import {clean} from  './utility.js'
import {clean as Cln} from  './utility.js'
import * as bundled from  './utility.js'  //bundled  to będzie obiekt ze wszysim co bylo w eksporcie
```

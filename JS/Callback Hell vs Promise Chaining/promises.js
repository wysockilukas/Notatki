
/*
Rozwiąznie problemu z uzyciem promises
*/


function getUserName(imie) {
    return new Promise( (resolve, reject)=>{
        resolve({name: imie})
    })
}


function getAge(data) {
    return new Promise( (resolve, reject)=>{
        resolve({...data, age:41} )
    })
}


function getDepartment(data){
    return new Promise( (resolve, reject)=>{
        resolve({...data, department:'OIZ'} )
    })
}

//ta funckja otrzyymuje dane i printInfo jak callback do wywolania, nic nie dopisuje tylko wywouje printInfo 
function getEmploeeCode(data) {
    return new Promise( (resolve, reject)=>{
        resolve(data )
    })
}

function printInfo(data) {
    console.log(data)
}

console.log('Przyklad 1')
getUserName('Łukasz')
    .then(getAge)
    .then(getDepartment)
    .then(getEmploeeCode)
    .then( res => {
    console.log(res)
})
console.log()

console.log('Przyklad 2')
getUserName('Łukasz')
    .then(getAge)
    .then(getDepartment)
    .then(getEmploeeCode)
    .then(printInfo)
console.log()



console.log('Przyklad 3')    
getUserName('Łukasz')
.then(getAge)
.then((res) => getDepartment(res))  //ten res jest zwracany w resolved w agu
.then(getEmploeeCode)
.then(printInfo)
console.log()


console.log('Przyklad 4')
getUserName('Łukasz')
.then(getAge)
.then((res) => {
    console.log('Jesteśmy w tym co zwróciło getAge', res)
    return  getDepartment(res)}
    )  //ten res jest zwracany w resolved w agu
.then(getEmploeeCode)
.then(printInfo)
console.log()



console.log('Przyklad 5')
getUserName()
    .then(() => {
        return new Promise( (resolve, reject)=>{
            resolve({name: 'Inne Imie'})
        })
    })
    .then(getDepartment)
    .then(getEmploeeCode)
    .then(printInfo)
console.log()


console.log('Przyklad 6')
getUserName()
    .then(() => {
        return new Promise( (resolve, reject)=>{
            setTimeout( () => {
                resolve({name: 'Po 2 suekundach'})
            }, 2000)
        })
    })
    .then(getDepartment)
    .then(getEmploeeCode)
    .then(printInfo)
console.log()

console.log('Przyklad 7')
getUserName('Po 4 sekundach')
    .then((res) => {
        return new Promise( (resolve, reject)=>{
            setTimeout( () => {
                resolve({...res, age:41} )
            }, 4000)
        })
    })
    .then(getDepartment)
    .then(getEmploeeCode)
    .then(printInfo)
console.log()

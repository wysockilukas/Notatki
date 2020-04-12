
/*
Przykład callback hell
*/

//ta funckja staruje jako pierwsza, dostje imie i getAge jak callback, wiec w srodku tej funckji wywolywany jest getAge, a getAge dostaje jako parametry dane i getDepartment jako kollejny callback
function getUserName(data, callback) {

    //callback to getAge
    callback( {name: data}, getDepartment)
}

//ta funckja dostaje getDepartment jako callback wiec po dopisaniu wieku uruchamia getDepartment do ktorego pzrekazuje getEmploeeCode
function getAge(data, callback) {
    //callback to getDepartment
    callback( {...data, age:41}, getEmploeeCode)
}

//ta funckja dostaje getEmploeeCode jako callback wiec po dopisaniu nazwy departmentu  uruchamia getEmploeeCode do ktorego pzrekazuje printInfo
function getDepartment(data, callback){
    //callback to getEmploeeCode
    callback( {...data, department:'OIZ'}, printInfo)
}

//ta funckja otrzyymuje dane i printInfo jak callback do wywolania, nic nie dopisuje tylko wywouje printInfo 
function getEmploeeCode(data, callback) {
    //callback to printInfo
    callback(data)
}

function printInfo(data) {
    console.log(data)
}


getUserName('Łukasz', getAge)



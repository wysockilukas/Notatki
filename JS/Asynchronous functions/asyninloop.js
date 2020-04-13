
// https://stackoverflow.com/questions/39538473/using-settimeout-on-promise-chain
// https://zellwk.com/blog/async-await-in-loops/

const fruitBasket = {
    apple: 27,
    grape: 0,
    pear: 14
  }

/*
  const getNumFruit = fruit => {
    return fruitBasket[fruit]
  }
*/

  const getNumFruit = fruit => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve( fruitBasket[fruit] )
        }, 1000);
    })
  }

  getNumFruit('apple')
  .then(num => console.log(num)) // 27

  /*
  setTimeout(() => {
      console.log(fruitBasket['pear'])
  }, 1000);
  */

 const control = async () => {
    console.log('Start')
  
    const numApples = await getNumFruit('apple')
    console.log(numApples)
  
    const numGrapes = await getNumFruit('grape')
    console.log(numGrapes)
  
    const numPears = await getNumFruit('pear')
    console.log(numPears)
  
    console.log('End')
  }

  control()

  const forLoop = async () => {
    console.log('Start 2')
  
    const arr = Object.keys(fruitBasket)
    for (let index = 0; index < arr.length; index++) {
        const fruit = arr[index]
        const numFruit = await getNumFruit(fruit)
        console.log(numFruit)
      }

    console.log('End 2')
  }

  forLoop()



  const mapLoop = async () => {
    console.log('Start 3')
  
    const promises = Object.keys(fruitBasket).map(async fruit => {
      const numFruit = await getNumFruit(fruit)
      return numFruit
    })
  
    const numFruits = await Promise.all(promises)
    console.log(numFruits)
  
    console.log('End 3')
  }

  mapLoop()
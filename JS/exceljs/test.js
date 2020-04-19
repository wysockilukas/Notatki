const fruitBasket = {
    apple: 27,
    grape: 0,
    pear: 14
  }


  const getNumFruit = fruit => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve( fruitBasket[fruit] )
        }, 1000);
    })
  }


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
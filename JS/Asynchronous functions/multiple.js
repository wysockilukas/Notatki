const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


// console.log('Now')
// sleep(1000)
//   .then(v => {
//     console.log('After one second')
//   })

  
  const getOne = () => {
    return sleep(1000).then(v => 1)
  }

  const getTwo = _ => {
    return sleep(1000).then(v => 2)
  }
  
  const getThree = _ => {
    return sleep(1000).then(v => 3)
  }

 /* 
  const test = async () => {
    console.log('Now')
  
    const one = await getOne()
    console.log(one)
  }
  
  test()
  */

 const test = async _ => {
    const one = await getOne()
    console.log(one)
  
    const two = await getTwo()
    console.log(two)
  
    const three = await getThree()
    console.log(three)
  
    console.log('Done')
  }
  
  test()


  const test2 = async () => {
    const promises = [getOne(), getTwo(), getThree()]
    console.log('Now')
  
    const [one, two, three] = await Promise.all(promises)
    console.log(one)
    console.log(two)
    console.log(three)
  
    console.log('Done')
  }
  
  test2()
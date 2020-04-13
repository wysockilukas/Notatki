
// https://zellwk.com/blog/async-await/
//Asynchronous functions always return promises

const getOne = async _ => {
    return 1
  }
  
  getOne()
  .then(value => {
    console.log(value) // 1
  })


  const test = async _ => {
    const one = await getOne()
    console.log(one) // 1
  }
  
  test()

  //lub

  test()
  .then(value => {
    console.log(value) // 1
  })
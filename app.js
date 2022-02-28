const loadAllPhone = ()=>{
    const allPhoneUrl =(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    fetch(allPhoneUrl)
    .then(res => res.json())
    .then(data =>console.log(data))
}

loadAllPhone()
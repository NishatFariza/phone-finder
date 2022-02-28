const loadAllPhone = ()=>{
    const searchValue =document.getElementById('search-input').value;

    // console.log(searchValue)
    const allPhoneUrl =(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    fetch(allPhoneUrl)
    .then(res => res.json())
    .then(data =>searchPhone(data.data, searchValue))
}

// loadAllPhone()

const searchPhone = (phones, searchValue) =>{
    console.log(phones)
    // console.log(searchValue); 
    const searchResultContainer = document.getElementById('search-result');
    phones.forEach(phone => {
        const {phone_name, image, brand, slug}= phone;
        // console.log(phone);
      const div =document.createElement('div');
      div.innerHTML=`
      <div class="text-center bg-dark text-white p-5 rounded">
      <img class="rounded-3" src="${image}"/>
      <h4 class="mt-5">Phone Name: <span class="favorite-color">${phone_name}<span></h4>
      <h5 class="mt-3">Brand Name: <span class="favorite-color">${brand}<span></h5>
      <button type="button" onclick="phoneDetails(slug${slug})" class="btn btn-outline-secondary px-4 py-2 mt-4">Explore Now</button>
    </div>
      `
      searchResultContainer.appendChild(div)
    });
}


const phoneDetails = slug =>{
    const phoneSlug =(`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`)
    fetch(phoneSlug)
    .then(res => res.json())
    .then(data => console.log(data))
}



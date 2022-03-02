const searchInput =document.getElementById('search-input');
const searchResultContainer = document.getElementById('search-result');
const phoneDetails =document.getElementById('phone-details')

//  all data load 
const loadAllPhone = ()=>{
  document.getElementById('spinner').style.display="block"
  // error handle and all load
  if(isNaN(searchInput.value)==false || searchInput.value==""){
    searchInput.value="";
        alert('Enter a vaild input')
        document.getElementById('spinner').style.display="none"
        
  }
  else{
    searchResultContainer.textContent="";
    phoneDetails.textContent="";
     // console.log(searchValue)
     const allPhoneUrl =(`https://openapi.programming-hero.com/api/phones?search=${searchInput.value}`)
     fetch(allPhoneUrl)
     .then(res => res.json())
     .then(data =>{
       if(data.status ==false){
        document.getElementById('spinner').style.display="none"
         document.getElementById('error-text').style.display="block";
            
       }
       else{
         searchPhone(data.data)
         document.getElementById('spinner').style.display="none"
        
       }
 
     })
     searchInput.value="";
  }    
}

const searchPhone = (phones) =>{ 
    const searchResultContainer = document.getElementById('search-result');
    const topTwentyPhone =phones.slice(0,20)
    topTwentyPhone.forEach(phone => {
        const {phone_name, image, brand, slug}= phone;
        // console.log(phone);
      const div =document.createElement('div');
      div.innerHTML=`
      <div class="text-center bg-dark text-white p-5 rounded">
      <img class="rounded-3" src="${image}"/>
      <h4 class="mt-5">Phone Name: <span class="favorite-color">${phone_name}<span></h4>
      <h5 class="mt-3">Brand Name: <span class="favorite-color">${brand}<span></h5>
      <button type="button" onclick="phoneSlugUrl('${slug}')" class="btn btn-outline-secondary px-4 py-2 mt-4">Explore Now</button>
    </div>
      `
      searchResultContainer.appendChild(div)
    });
    
}

// load sinlge phone data 
const phoneSlugUrl = slug =>{
    const slugUrl =(`https://openapi.programming-hero.com/api/phone/${slug}`)
    fetch(slugUrl)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}


const displayPhoneDetails = details =>{
    window.scrollTo(0, 300);
    console.log(details)
    phoneDetails.textContent="";
      const phoneDetailsContainer =document.createElement('div');
      phoneDetailsContainer.classList.add('phone-style')
      const {name, image, brand, mainFeatures}= details;
      console.log(details)
      const sensors = mainFeatures.sensors;
      const showSensor = sensors.map((sensor) => sensor +" ")
      
      phoneDetailsContainer.innerHTML=`
         <div class="text-center w-100">
            <img  class="img-fluid rounded-lg w-25 mt-3" src="${image}"/>
          </div>
          <div class="text-center">
            <div class="card-body">
              <h4 class="card-title mt-3">${brand}</h4>
              <h3 class="card-title favorite-color mt-2 phone-title fw-bold"> ${name}</h3>
              <h5 class="card-text my-4">
                ReleaseDate: <span class="text-muted">${details.releaseDate ? details.releaseDate : "Comming Soon..."}</span>
              </h5>
              <p class="card-text fw-bold">
                MainFeatures:
                <ul  class="list-unstyled">
                <li>Chipset: <span class="text-muted">${mainFeatures.chipSet}</span></li>
                <li>Display size: <span class="text-muted">${mainFeatures.displaySize}</span></li>
                <li>Memory: <span class="text-muted">${mainFeatures.memory}</span></li>
                <li>Storage: <span class="text-muted">${mainFeatures.storage}</span></li>

                <li>Sensor: <span class="text-muted">${showSensor}</span></li>
               
                </ul>
              </p>
            </div>
          </div>
      `;
      phoneDetails.appendChild(phoneDetailsContainer)

//others feature data
       const otherDiv = document.createElement('div')
       otherDiv.innerHTML=`
       <p class="card-text text-center text-black fw-bold">
       Others:
       <ul class="list-unstyled text-center">
       <li>Bluetooth: <span class="text-muted">${details?.others?.Bluetooth ? details?.others?.Bluetooth : "Not Found"}</span></li>
       <li>GPS: <span class="text-muted">${details?.others?.GPS ? details?.others?.GPS :"Comming Soon"}</span></li>
       <li>NFC: <span class="text-muted">${details?.others?.NFC ? details?.others?.NFC : "Comming Soon"}</span></li>
       <li>Radio: <span class="text-muted">${details?.others?.Radio ? details?.others?.Radio : "Not Found"}</span></li>
       <li>USB: <span class="text-muted">${details?.others?.USB ? details?.others?.USB : "Comming Soon"}</span></li>
       <li>WLAN: <span class="text-muted">${details?.others?.WLAN ? details?.others?.WLAN : "Not Found"}</span></li>
       </ul>
     </p> 
       `;
       phoneDetailsContainer.appendChild(otherDiv)
      }


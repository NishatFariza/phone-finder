const searchInput =document.getElementById('search-input');
const searchResultContainer = document.getElementById('search-result');
const phoneDetails =document.getElementById('phone-details')

const loadAllPhone = ()=>{
  document.getElementById('spinner').style.display="block"
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

// loadAllPhone()

const searchPhone = (phones) =>{
    // console.log(phones)
    // console.log(searchValue); 
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


const phoneSlugUrl = slug =>{
    const slugUrl =(`https://openapi.programming-hero.com/api/phone/${slug}`)
    fetch(slugUrl)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}


const displayPhoneDetails = details =>{
    console.log(details)
    phoneDetails.textContent="";
        // console.log(phoneDetails);
      const playerDetailsContainer =document.createElement('div');
      playerDetailsContainer.classList.add('player-style')
      const {name, image, brand, mainFeatures, others}= details;
      if(details.releaseDate==""){
        details.releaseDate="Comming soon...";
      }
      playerDetailsContainer.innerHTML=`
         <div class="text-center w-100">
            <img  class="img-fluid rounded-lg w-25 mt-3" src="${image}"/>
          </div>
          <div class="text-center">
            <div class="card-body">
              <h4 class="card-title mt-3">${brand}</h4>
              <h3 class="card-title favorite-color mt-2 phone-title fw-bold"> ${name}</h3>
              <h5 class="card-text my-4">
                ReleaseDate: ${details.releaseDate}
              </h5>
              <p class="card-text fw-bold">
                MainFeatures:
                <ul  class="list-unstyled">
                <li>Chipset: <span class="text-muted">${mainFeatures.chipSet}</span></li>
                <li>Display size: <span class="text-muted">${mainFeatures.displaySize}</span></li>
                <li>Memory: <span class="text-muted">${mainFeatures.memory}</span></li>
                <li>Storage: <span class="text-muted">${mainFeatures.storage}</span></li>

                <li>Sensors: <span class="text-muted">${mainFeatures.sensors.map(item =>item).join('')}</span></li>
               
                </ul>
              </p>
            </div>
          </div>
      `;
      phoneDetails.appendChild(playerDetailsContainer)

      if(details.others != undefined){
       const otherDiv = document.createElement('div')
       otherDiv.innerHTML=`
       <p class="card-text text-center text-black fw-bold">
       Others:
       <ul class="list-unstyled text-center">
       <li>Bluetooth: <span class="text-muted">${others.Bluetooth}</span></li>
       <li>GPS: <span class="text-muted">${others.GPS}</span></li>
       <li>NFC: <span class="text-muted">${others.NFC}</span></li>
       <li>Radio: <span class="text-muted">${others.Radio}</span></li>
       <li>USB: <span class="text-muted">${others.USB}</span></li>
       <li>WLAN: <span class="text-muted">${others.WLAN}</span></li>
       </ul>
     </p> 
       `;
       playerDetailsContainer.appendChild(otherDiv)


      }
}

/* <li>Sensors: <span class="text-muted text-wrap">${mainFeatures.sensors}</span></li> */
/* <li>Storage: <span class="text-muted">${mainFeatures.sensors[0]}, ${mainFeatures.sensors[1]}, ${mainFeatures.sensors[2]}, ${mainFeatures.sensors[3]}, ${mainFeatures.sensors[4]}, ${mainFeatures.sensors[5]}</span></li> */
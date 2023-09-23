// frontend


// Get the pathname (path part of the URL)
const pathname = window.location.pathname; // Returns "/profile/dynamic-url"

// Split the pathname to get the dynamic URL parameter
const parts = pathname.split("/"); // Splits into ["", "profile", "dynamic-url"]

const dynamicURL = parts[3]; 



const UI = {
    fullViewCancelButton : document.querySelector("#cancel-button-div svg"),
    //  detailDiv : document.querySelector(".detail div"),
    elementPictures : document.querySelectorAll(".element-pictures img"),
    fullView : document.querySelector(".full-view"),
    fullViewImage: document.querySelector(".full-view img"),
    fullImage: document.querySelector("#element-full-picture img"),
    iframe : document.getElementById("display-iframe"),
   
    mainImageDiv : document.querySelector(".main-image div"),
    prevBtn : document.querySelector(".prev-btn"),
    nextBtn : document.querySelector(".next-btn"),
    
    fullViewImageDiv : document.querySelector('.full-view-image'),
    elementFullPx : document.getElementById("element-full-picture"),
    mainSection: document.getElementById('main-section'),
    mainView: document.getElementById('main-view'),

    elementPreview: document.getElementById("element-preview"),
    elementPreviewXbtn: document.getElementById("element-preview-cancel-btn"),
    elemenFullPxXbtna: document.getElementById("element-fp-cancel-btn"),
    elementDetailsContainer : document.getElementById("element-details"),
    detailHeader : document.getElementById("detail-header"),
}






//global variables
// const cachedProfile = JSON.parse(localStorage.getItem('profile'))
// const cachedElements = JSON.parse(localStorage.getItem('addedElements'))


const iframeDoc = UI.iframe.contentDocument || UI.iframe.contentWindow.document
let elementIndex;
let imageIndex = 0
let prevElement = null
let fullVIewVisibility = false 



// resize Iframe according to viewport



//click event listener
UI.fullViewCancelButton.addEventListener('click',()=>{

    UI.fullView.classList.remove("visibility")
    fullVIewVisibility = !fullVIewVisibility
})

UI.elementPreviewXbtn.addEventListener("click",()=>{
  UI.elementPreview.classList.remove("active")

  setTimeout(()=>{
    UI.elementPreview.classList.remove("visibility")
  },300)
  
 
})



UI.elemenFullPxXbtna.addEventListener("click",()=>{
  
    UI.elementFullPx.classList.remove("visibility")
  
})



// UI.detailDiv.addEventListener("click",()=>{
//     if(fullVIewVisibility){
//         UI.fullView.classList.remove("visibility")
       
//     }else{
//         UI.fullView.classList.add("visibility")
//     }

//     fullVIewVisibility = !fullVIewVisibility
//     const imageElement = document.createElement("img");

//     imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
//     imageElement.style.maxWidth = "100%"
//     UI.fullViewImageDiv.innerHTML = ""
//     UI.fullViewImageDiv.appendChild(imageElement)
    
// })



const init = async() =>{

  //change the size of frame
   let width = window.getComputedStyle(UI.mainView).getPropertyValue("width")
   let height = window.getComputedStyle(UI.mainSection).getPropertyValue("height")
   
   const size = (adjustFrame(width,height))
   console.log(size)
   UI.iframe.style.width = size[0]
   UI.iframe.style.height = size[1]

const {profile:cachedProfile, elements:cachedElements}  = await getProfileDataInit(dynamicURL)

// full picture view

Array.from(UI.elementPictures).forEach((ep)=>{
  ep.addEventListener("click",()=>{
    UI.elementFullPx.classList.add("visibility")
    UI.fullView.classList.add("visibility")
    //full image src
    console.log(UI.fullImage)
    UI.fullImage.src = cachedElements[elementIndex].imageUrl[imageIndex]  
    UI.fullViewImage.src = cachedElements[elementIndex].imageUrl[imageIndex] 
   
  })
})

//copy and pasted: review
if(cachedProfile?.imageUrl){
    var image = new Image();
    image.src = cachedProfile.imageUrl;
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    image.style.objectPosition = 'center';
    iframeDoc.body.appendChild(image)

    UI.mainImageDiv.appendChild(image.cloneNode())

  }

  //copy and pasted: review


if(cachedProfile && cachedElements){

   

  //add element to iframe
   
    cachedElements.forEach((elem,index)=>{
        
      
      //only elements that have image url are seen in the preview
      if(elem.imageUrl?.length > 0)
      {
      
        if(!elementIndex)
          elementIndex = index
         
          console.log(elem)
     
      let position = {
        left: Math.floor(size[2] * parseFloat(elem.left)) + "px",
        top: Math.floor(size[2] * parseFloat(elem.top)) + "px",
      }
      // elem.type: e.g door-element, wall-element etc
       const element =  createCircle(elem.type, position, elem.color)
       element.setAttribute("id",elem.id)
       if(index === elementIndex){
        element.style.border ="2px solid grey"
        prevElement = element
       }

       //click event for elements in the iframe

       element.addEventListener("click",()=>{
        imageIndex = 0
        prevElement.style.border = "none"
         element.style.border ="2px solid grey"
         prevElement = element
         
        //copied and pasted: review
        //  const imageElement = document.createElement("img");
        elementIndex = index 
        Array.from(UI.elementPictures).forEach(ep=>{
          ep.src = cachedElements[index].imageUrl[imageIndex] 
        })
      //   imageElement.style.maxWidth = "100%";

      //  UI.detailDiv.innerHTML = ""
      //  UI.detailDiv.appendChild(imageElement);
      console.log(UI.elementPreview)
        UI.elementPreview.classList.add("visibility")

        setTimeout(()=>{
          UI.elementPreview.classList.add("active")
        },100)
       

        //add element name to header 
        console.log(UI.detailHeader)
        UI.detailHeader.innerText = elem.name

        //add element details
        UI.elementDetailsContainer.innerHTML = ""
         const elementCustomSetting = elem.customSetting
        if(elementCustomSetting){
           for(let key in elementCustomSetting){
             if(elementCustomSetting.hasOwnProperty(key)){
              console.log(`key ${key} and ${elementCustomSetting[key]}`)
               const paragraph = document.createElement("p")
               paragraph.innerText = `${elementCustomSetting[key].titleInput} : ${elementCustomSetting[key].valueInput}`
               UI.elementDetailsContainer.appendChild(paragraph)
             }
           }
        }


       })

       
      
       iframeDoc.body.appendChild(element);
      }
   
    })
    
  }

  //copied and pasted: review

  // const imageElement = document.createElement("img");

  // imageElement.src = cachedElements[elementIndex].imageUrl[imageIndex];
  // imageElement.style.maxWidth = "100%";


//  UI.detailDiv.appendChild(imageElement);

  Array.from(UI.elementPictures).forEach(ep=>{
    ep.src = cachedElements[elementIndex].imageUrl[imageIndex];
  })
    
  UI.prevBtn.addEventListener("click", ()=>{
    if(imageIndex > 0){
    --imageIndex
  //  UI.detailDiv.innerHTML = ""
  
  Array.from(UI.elementPictures).forEach(ep=>{
    ep.src = cachedElements[elementIndex].imageUrl[imageIndex];
  })
  
  //  UI.detailDiv.appendChild(imageElement);
  //   UI.fullViewImageDiv.innerHTML =""
  //   UI.fullViewImageDiv.appendChild(imageElement.cloneNode())
    }
  })

  UI.nextBtn.addEventListener("click", ()=>{
    if(imageIndex < cachedElements[elementIndex].imageUrl.length -1 )
    {
    ++imageIndex
  //  UI.detailDiv.innerHTML = ""
  Array.from(UI.elementPictures).forEach(ep=>{
    ep.src = cachedElements[elementIndex].imageUrl[imageIndex];
  })
  //  UI.detailDiv.appendChild(imageElement);
  //   UI.fullViewImageDiv.innerHTML =""
  //   UI.fullViewImageDiv.appendChild(imageElement.cloneNode())
    }
  })

}

init()


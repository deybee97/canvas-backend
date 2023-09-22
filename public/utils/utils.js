

const populateImagePreview = (imageUrl,imagePreview) => {
    const imageElement = document.createElement("img");

    imageElement.src = imageUrl;
    imageElement.style.maxWidth = "100%";
    
    imagePreview.innerHTML = ""; // Clear previous preview
    imagePreview.appendChild(imageElement);
    imagePreview.classList.add("visibility")
    
}


const addImageToFrame = (imageUrl, iframeDoc) => {
    var existingImage = iframeDoc.querySelector('img');

    if (existingImage) {
        existingImage.parentNode.removeChild(existingImage);
    }

    var image = new Image();
    image.src = imageUrl;
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    image.style.objectPosition = 'center';


    iframeDoc.body.appendChild(image)
}

function rgbStringToHex(rgbString) {
    const components = rgbString.match(/\d+/g); // Extract numerical values
    if (!components || components.length !== 3) {
      return null; // Invalid input
    }
  
    const r = parseInt(components[0]);
    const g = parseInt(components[1]);
    const b = parseInt(components[2]);
    
    return rgbToHex(r, g, b);
  }



  function adjustFrame(screenWidth, screenHeight, frameType = "landscape" ) {
   
  
   screenWidth = screenWidth.split("")
   screenWidth.splice(screenWidth.length-2,2)
   screenHeight =screenHeight.split("")
   screenHeight.splice(screenHeight.length-2,2)
   
   screenWidth = ((screenWidth.join("")))
   screenHeight = (screenHeight.join(""))

   console.log(screenWidth, screenHeight)
   // calculate 80% of screen width 
   let adjSW = 1 * screenWidth
   // calculate 80% of screen height 
   let adjSH = 1 * screenHeight


   
    
    if(frameType === "portrait"){
        const adjustment = (5*adjSW - 3*adjSH)/5 >= 0 ? adjSW -= (5*adjSW - 3*adjSH)/5: adjSH-=(3*adjSH - 5*adjSW)/3
    }else{
        const adjustment = (3*adjSW - 5*adjSH)/3 >= 0 ? adjSW -= (3*adjSW - 5*adjSH)/3: adjSH-=(5*adjSH - 3*adjSW)/5
    }
   
    const elemAdjustment = ((((adjSW - 500) /500)*100)+100)/100
   
    console.log(adjSW,adjSH)
    return [Math.floor(adjSW),Math.floor(adjSH), elemAdjustment]
  }
  







//create custom setting


  const createCustomSetting =(customContent ,id, customSetting, callback)=>{
   
   
    customChange ={ }

    const uniqueClassName = id || generateRandomId(10)

    const contentDIV = document.createElement("div")
    contentDIV.classList.add("thin-line-container","asset-input")
    contentDIV.id = uniqueClassName
    
    const titleInput = document.createElement("input")
    titleInput.classList.add("desc-input","title-input",uniqueClassName)
    titleInput.style.width = "40%"
    titleInput.placeholder = "Add Title"
    titleInput.type = "text"
    titleInput.value = customSetting?.titleInput ? customSetting.titleInput: ""
    
    
    
    
    const valueInput = document.createElement("input")
    valueInput.classList.add("desc-input","value-input",uniqueClassName)
    valueInput.style.width = "40%"
    valueInput.placeholder = "Add Description"
    valueInput.type = "text"
    valueInput.value = customSetting?.valueInput ? customSetting.valueInput: ""
  
   // Create a cancel button with a circular shape and "X" symbol
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.style.borderRadius = "20%"; // Make it circular
  cancelButton.style.marginLeft = "10px"
  cancelButton.style.border = "none"
  
  
  // cancelButton.style.width = "20%"
  
  cancelButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M6.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8l3.647-3.646a.5.5 0 1 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 0 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>';
  
  // Add a click event listener to remove the entire contentDIV when the cancel button is clicked
  cancelButton.addEventListener("click",  async()=> {
    contentDIV.remove();
    let deletedElementPropId = null;
     delete customChange[uniqueClassName]
     delete window.settings.customChange[uniqueClassName]
    
    window.addedElements = window.addedElements.map(element=>{
        if(element.customSetting?.hasOwnProperty(uniqueClassName)){
       
            delete element.customSetting[uniqueClassName]
            deletedElementPropId = uniqueClassName
        }
         
        return element
    })

    console.log(deletedElementPropId)
    if(deletedElementPropId){
    
       await deleteElementProperty(dynamicURL, selectedElementId,deletedElementPropId)
    }
  });
  
    const column = document.createElement("h6")
    column.textContent = ":"
  
  
    
    contentDIV.appendChild(titleInput)
    contentDIV.appendChild(column)
    contentDIV.appendChild(valueInput)
    contentDIV.appendChild(cancelButton)
    customContent.appendChild(contentDIV)
  
  
    titleInput.addEventListener("change",(event)=>{
  
      const selectedElementInfo = window.addedElements.find(element=> element.id === selectedElementId)
      if(selectedElementInfo.customSetting)
      {
      customChange ={
        
        
        ...customChange,
        [uniqueClassName]:{
            ...selectedElementInfo.customSetting[uniqueClassName],
            ...customChange[uniqueClassName]
        }
      }
     }
  
      saveOptionButton.removeAttribute("disabled")
      const titleInput = event.target.value
   
  
      customChange = {
        ...customChange,
        [uniqueClassName] : {
          ...customChange[uniqueClassName],
          titleInput
        }
      }
  
      callback(customChange)
    })
  
  
    valueInput.addEventListener("change",(event)=>{
  
      const selectedElementInfo = window.addedElements.find(element=> element.id === selectedElementId)
      
      if(selectedElementInfo.customSetting)
      {
      customChange ={
        
        // ...selectedElementInfo.customSetting[],
        ...customChange,
        [uniqueClassName]:{
            ...selectedElementInfo.customSetting[uniqueClassName],
            ...customChange[uniqueClassName]
        }
      }
     }
  
      saveOptionButton.removeAttribute("disabled")
      const valueInput = event.target.value
    
      customChange = {
        ...customChange,
        [uniqueClassName] : {
          ...customChange[uniqueClassName],
          valueInput
        }
      }
      callback(customChange)
    })

  }

//   module.exports = {
//     adjustFrame
//   }

  
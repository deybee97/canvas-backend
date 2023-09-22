// Get necessary elements






// Function to handle adding a new floor
function addFloor(existingFloor) {

 


  if(!profile){
  
  // let profileId = existingFloor?.id || generateRandomId(12); 


  // Create a new list item for the floor

  const floorItem = document.createElement("li");
  floorItem.classList.add("floor-item")
  

  

  const floorInnerDivText = existingFloor.profileName || "new Profile"
  

  // set floorId as dynamic url
  floorItem.id = dynamicURL
  
  profile = {
    id: dynamicURL,
    name:  existingFloor.profileName ? existingFloor.profileName : "new profile",
    type: "profile",
    imageUrl: existingFloor.imageUrl,
  }

  localStorage.setItem('profile',JSON.stringify(profile))
  

  // Create a nested list for the elements under the floor
  const elementList = document.createElement("ul");
  elementList.id = "profile-child"
  floorItem.classList.add("hierarchy-pane-floor")
  
  // Append the nested list to the floor item
  floorItem.appendChild(elementList);

  // Add the floor item to the hierarchy pane
  floorList.appendChild(floorItem);

  const floorInnerDiv = document.createElement("div")
  floorInnerDiv.innerText =floorInnerDivText
  floorInnerDiv.style.display ="inline-block"
  
  floorItem.insertBefore(floorInnerDiv, floorItem.firstChild)

  const floorButton = document.createElement("button");
  floorButton.classList.add("floor-button");
  floorButton.classList.add(dynamicURL)


  // Add some basic styling to the button

  floorButton.style.backgroundColor = "#D9D9D9";
  floorButton.style.color = "white";
  floorButton.style.border = "none";
  floorButton.style.cursor = "pointer";

  floorItemButton = floorButton

  floorItem.insertBefore(floorButton, floorItem.firstChild);

 
 
  // Add click event listener to the floor item
  // floorButton.addEventListener("click", selectFloor);

  floorInnerDiv.addEventListener("click",(event)=>{ 
    
    handleProfileDoubleClick(event)
    
  })
 }else{
  alert("floor already created")
 }
}



   
    
 



// Function to handle selecting a floor
function selectFloor(event) {

 
  
  let selectedFloor = event.target;
  

  if(selectedFloor.classList.contains("floor-button")){
    console.log(selectedFloor)
    if(selectedFloor.classList.contains("selected")){
      selectedFloor.classList.remove("selected")
    }else{
      selectedFloor.classList.add("selected")
    }
    selectedFloor = document.getElementById(selectedFloor.classList[1])
  }
  
  console.log("selectFloor")

  // let close = false

 
  if(selectedFloor.classList.contains("floor-element")){
    console.log("floor element")
   
    return
  }

  if(selectedFloor.classList.contains("selected")){
     console.log("removed")
    selectedFloor.classList.remove("selected")
    return
    // close = true
  }

  // add elements to the iframe


  selectedFloor.classList.add("selected");

}

// Function to handle adding a new element under the selected floor
// function addElementToPane(floor, element, elementTypeId, elementId) {

//   // Get the selected floor
//   let addedElementId = element ? element.id : elementId
 
 

//   const selectedFloor = document.getElementById(floor?.id) || document.querySelector("#floor-list li");


//   // if (window.selectedFloor) {
//     // Create a new element item
//     const elementItem = document.createElement("li");
//     elementItem.classList.add("floor-element")
//     elementItem.classList.add(elementTypeId)
//     elementItem.setAttribute("id", addedElementId)
//     elementItem.textContent = element?.name ? element.name : "New Element";

//     // Append the element item to the selected floor's nested list
//     console.log(selectedFloor)
//     const elementList = selectedFloor.querySelector("ul");
    
//     elementList.classList.add("elements-container")
    
//     elementList.appendChild(elementItem);


//     // event listener for elements in the hierarchy pane
//     elementItem.addEventListener("click",(event)=>{handleHierarchyElement(event,"elements")})
//   // } else {
//   //   alert("Please select a floor first.");
//   // }
// }


//onclick element in the hierarchy, the right side pane appears with all the info of the elements

function handleProfileDoubleClick(event) {
    console.log(event.target)
    
   
    handleHierarchyElement(event,"profile")
}

const handleHierarchyElement = (event,elementType) => {
  
  console.log(event.target)
  assetOptions.classList.remove("profile")
  assetOptions.classList.remove("elements")
 
  assetOptions.classList.add(elementType)
  
  if(selectedElement){
    selectedElement.classList.remove("selected")
  }
  
  selectedElementId = event.target.id
  selectedElementType = elementType
 // get the data of selected element from added elements
  
  const selectedElementInfo = elementType === "profile" ? profile :addedElements.find(element=> element.id === selectedElementId)
  
  console.log(selectedElementInfo)

 
  imagePreview.innerHTML = ""
  imagePreview.classList.remove("visibility")
   
  // dynamically add the existing value for the selected element

     if(elementType=="profile"){
      assetDesc.value = selectedElementInfo.name
    
      if(selectedElementInfo.imageUrl){
        populateImagePreview(selectedElementInfo.imageUrl, imagePreview)
      }
      
     }else{
      // check script.js for reference
      if(window.prevSelected){
        window.prevSelected.style.border = "none"
      }
      window.prevSelected = iframeDoc.querySelector(`.iframe-element#${selectedElementId}`)
      window.prevSelected.style.border = "2px solid grey"
   
      const {name, color, imageUrl, customSetting} = selectedElementInfo
      
      assetDesc.value = name

      //loop throught the custom setting and populate the option-pane
      console.log(customSetting)
      customContent.innerHTML = ""
      for (let key in customSetting) {
        if (customSetting.hasOwnProperty(key)) {
          // console.log(key + ': ' + customSetting[key]);
          createCustomSetting(customContent, key, customSetting[key],(customChange)=>{
            console.log(customChange)
              settings.customChange = customChange
           })
        }
      }
      if(imageUrl){
        // image url in this case is an array
        populateImagePreview(imageUrl[imageUrl.length-1], imagePreview)
      }
      
      assetColor.value = color

     }
    
    event.target.classList.add("selected")
    selectedElement = event.target
   
    assetOptions.classList.add("visibility")
}



//comment out
// if(cachedProfile)
// {
//   addFloor(cachedProfile)
// }







//TODO: I might have to pass the actual elemts later 
// Elements that have been saved 
// JSON.parse(localStorage.getItem('floors')).forEach(floor=>{
  
  
//   let elements = addedElements.filter(element=> (element.floor_id )== floor.id)

// addedElements.forEach(element=> addElementToPane(null, element,element.type,null))



// Attach event listeners
addFloorButton.addEventListener("click", addFloor);

//floorItemButton.addEventListener('click', selectFloor )


// add event listeners to all the asset buttons. Note that at this point there is only one asset button
// Array.from(addElementButton).forEach(element=>{

//   element.addEventListener("click", ()=>{addElementToPane(null,null,element.id)});
// })




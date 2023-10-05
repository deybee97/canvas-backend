const addFloorButton = document.getElementById("add-floor-button");
const floorList = document.getElementById("floor-list");
const addElementButton = document.getElementsByClassName("add-element-button");
const assetOptions = document.getElementById('asset-options')
const assetOptionsCancelButton = assetOptions.querySelector("#cancel-button-div > svg ")
const assetSize = document.getElementById("asset-size")
const assetDesc = document.getElementById("asset-desc")
const assetColor = document.getElementById("asset-color")
const shapePickerButton = document.getElementById("shape-button")
const shapeContainer = document.getElementsByClassName("shape-container")
const assetButton = document.getElementById("image-upload-button")
const imageInput = document.getElementById("image-input")
const imagePreview = document.getElementById("image-preview")
const saveOptionButton = document.getElementById("save-button")
const scaleCheckbox = document.getElementById("scale-checkbox")
const colorCheckbox = document.getElementById("color-checkbox")
const canvasContainer = document.getElementById('canvas-container');
const iframe = document.getElementById('canvas');
const zoomRange = document.getElementById('zoom-range');
const parentDiv = document.querySelector('.top-pane-tools');
// Select all the SVG elements within the parent div
const svgElements = parentDiv.querySelectorAll('svg');
const previewBtn = document.getElementById('preview-button')
const customAssetBtn = document.getElementById("custom-asset-btn")
const customContent = document.getElementById("custom-content")

const titleInput = document.getElementsByClassName("title-input")
const assetInput = document.getElementsByClassName("asset-input")

const resizeBtn = document.getElementById("resize-button")
// save pane elements so it can be easily manipulated
window.paneElement =[]

//global variable 
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//we are selecting only one because we are working with only 1 floor
let floorItemButton = null


//global variable
let profile = null
window.addedElements =  []
let selectedFloorId = 1
let selectedElementId = null
let selectedElement
let selectedElementType = null


//error?
// let visible = false

//local storage 

// Get the pathname (path part of the URL)
const pathname = window.location.pathname; // Returns "/profile/dynamic-url"

// Split the pathname to get the dynamic URL parameter
const parts = pathname.split("/"); // Splits into ["", "profile", "dynamic-url"]

window.dynamicURL = parts[2]; 


let cachedProfile = localStorage.getItem('profile')? JSON.parse(localStorage.getItem('profile')) : null

function addElementToPane(floor, element, elementTypeId, elementId) {

    // Get the selected floor
    let addedElementId = element ? element.id : elementId
   
   
  
    const selectedFloor = document.getElementById(floor?.id) || document.querySelector("#floor-list li");
  
  
    // if (window.selectedFloor) {
      // Create a new element item
      const elementItem = document.createElement("li");
      elementItem.classList.add("floor-element")
      elementItem.classList.add(elementTypeId || element.type)
      elementItem.setAttribute("id", addedElementId)
      elementItem.textContent = element?.name ? element.name : "New Element";
      

      // consider adding this to local storage for caching
      paneElement.push({id:addedElementId, paneElement:elementItem})

      // Append the element item to the selected floor's nested list
     
       const elementList = selectedFloor.querySelector("ul");
      
      elementList.classList.add("elements-container")
      
      elementList.appendChild(elementItem);
      
      
      
      // event listener for elements in the hierarchy pane
      elementItem.addEventListener("click",(event)=>{handleHierarchyElement(event,"elements")})
    // } else {
    //   alert("Please select a floor first.");
    // }
  }
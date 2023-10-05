

async function editToolFunctions(editType, iframeDoc){
    console.log(editType)
    if(editType ==="delete"){
        handleDelete(iframeDoc)
    }
    else if(editType === "copy"){
       const response = await handleCopy(iframeDoc)
       return response
    }
}

async function handleDelete () {
    // const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document
    //  console.log(window.addedElements.length)
    if(window.prevSelected && iframeDoc){

        //remove element from canvas
        window.addedElements = window.addedElements.filter(element=>element.id !== window.prevSelected.id)
       
        //remove element from pane
        window.paneElement = window.paneElement.filter(paneElement=>{
           if(paneElement.id === window.prevSelected.id){
            console.log(paneElement.paneElement)
            paneElement.paneElement.remove()
           }
        })

        window.prevSelected.remove()
         
       console.log(window.addedElements.length)
       localStorage.setItem("addedElements", JSON.stringify(window.addedElements))
       console.log(window.dynamicURL, window.prevSelected.id)
       await deleteElement(window.dynamicURL,window.prevSelected.id)
     
    }
}

async function handleCopy(){
    alert("copy")
    // const iframeDoc = window.iframe.contentDocument || window.iframe.contentWindow.document
    if(window.prevSelected && iframeDoc){
    const copiedElement = window.addedElements.find(element=>element.id === window.prevSelected.id)
 

    const  newElement = {
        ...copiedElement,
        id: generateRandomId(12),
        top: "10px",
        left: "10px",
        name: "New Element",
        
    }
    //delete image url
    delete newElement.imageUrl

 
    const element = createCircle(newElement.type)
    element.setAttribute("id", newElement.id)
    element.style.color = newElement.color
    
    
   

    try {
        // add element to database

        await createElement(window.dynamicURL,newElement)
    
        iframeDoc.body.appendChild(element)
        element.addEventListener('mousedown', window.handleSquareMouseDown);
        console.log(element)
        window.addedElements.push({...newElement, element})
        localStorage.setItem("addedElements", JSON.stringify(window.addedElements))
         
        return newElement
      } catch (error) {
        console.log(error)
      }
}    

}
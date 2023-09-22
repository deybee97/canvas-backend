
const {db} = require("../config")

const createElement = async(req,res) => {
    
    const elementData = req.body
    const {profileId,elementId} = req.query
   
    try {
        const elementRef = db.collection("profile").doc(profileId).collection("elements").doc(elementId);
        await elementRef.set(elementData);
        res.json({ success: true})
      } catch (error) {
        console.error("Error creating element:", error);
      }
    }
const deleteElement = async (req,res) => {
    const {profileId,elementId} = req.query
    try {
        const elementRef = db.collection("profile").doc(profileId).collection("elements").doc(elementId);
    
        await elementRef.delete();
        res.json({ success: true})
      } catch (error) {
        console.error("Error deleting element:", error);
      }
}

const modifyElement = async(req,res) => {

    const {profileId,elementId} = req.query
    const {color, imageUrl, name, customSetting, deletedElementPropId} = req.body

    try {
        const profileRef = db.collection("profile").doc(profileId);
        const profileDoc = await profileRef.get();
    
        if (!profileDoc.exists) {
          res.status(400).json({success:false, message: "element doesnt exist"})
        }
    
        const elementRef = profileRef.collection("elements").doc(elementId);
        const elementDoc = await elementRef.get();
    
        if (!elementDoc.exists) {
            res.status(400).json({success:false, message: "element doesnt exist"})
        }
    
        // Create an object with the properties to update
        const updatedData = {};
        if (color) {
            updatedData.color = color;
        }
        if (name) {
          updatedData.name = name;
        }
        if (imageUrl) {
          updatedData.imageUrl = imageUrl;
        }

        // ... other properties to update
        if(customSetting){
        
          updatedData.customSetting = {...elementDoc.data().customSetting, ...customSetting}
        }
        if(deletedElementPropId){
          const currenElemProp = elementDoc.data().customSetting
          console.log(currenElemProp)
          const customSetting = {}
           for(let key in currenElemProp){
             if(currenElemProp.hasOwnProperty(key) && key !== deletedElementPropId){
              customSetting[key] = currenElemProp[key]
             }
           }
           
           updatedData.customSetting = customSetting
        }
    
        if (Object.keys(updatedData).length === 0) {
          res.status(400).json({success:false, message: "provide one or more changes"})
        }
    
        await elementRef.update(updatedData);

        res.status(200).json({success:true})
        console.log("Element updated successfully");
      } catch (error) {
        console.error("Error updating element:", error);
      }
    
}


//updates position of the element
const changePosition = async(req,res) => {

    const positionCoord = req.body
    const {profileId, elementId} = req.query
     
    console.log(profileId, elementId)
    try {
        const elementRef = db.collection("profile").doc(profileId).collection("elements").doc(elementId);
    
        await elementRef.update(positionCoord);
        res.json({ success: true})
      } catch (error) {
        console.error("Error updating element:", error);
      }
    
}

const getElements = async(req,res)=> {

    const {profileId} = req.query
    
    try {
        const elementsRef = db.collection("profile").doc(profileId).collection("elements");
         
        const snapshot = await elementsRef.get();
        
        const elements = [];
        snapshot.forEach((doc) => {
          elements.push({ id: doc.id, ...doc.data() });
        });
        
        res.json({ success: false, data:elements})
       
      } catch (error) {
        console.error("Error fetching elements:", error);
        res.json({success:false, message: "an error occurred"})
      }

    

}

module.exports = {
    createElement,
    deleteElement,
    modifyElement,
    changePosition,
    getElements
}
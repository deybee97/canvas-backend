
const localDev = false


const baseUrl = localDev ? "http://localhost:3000/api/v1":"https://canvas-backend.onrender.com/api/v1"

//get profile
async function getProfileDataInit(dynamicURL){
    //make a request to database to get profile
   
    
    try {
  
      const resProfile= await axios.get(`${baseUrl}/profile?profileId=${dynamicURL}`,
        {
          'Content-Type':'application/json'
        }
      )
  
      
      const resElements = await axios.get(`${baseUrl}/elements?profileId=${dynamicURL}`)
      
     
      const response = {
        profile: resProfile.data.profile,
        elements: resElements? resElements.data.data:[]
      }

 

      return response
    } catch (error) {
      console.log(error)
    }
  }



  const deleteElementProperty = async(dynamicURL, selectedElementId, deletedElementPropId)=>{
    try{
        const res = await axios.put(`${baseUrl}/elements/settings?profileId=${dynamicURL}&elementId=${selectedElementId}`,
    {
      deletedElementPropId
    },
     {
       "Content-Type":"application/json"
     }
    )
    console.log(res)
    
    } catch (error) {
    
    }
    
    }


    //api to create profile
    const createProfile = async(profileName,id) => {
      try {
        const res = await axios.post(`${baseUrl}/profile`,
        {
          id,
          profileName,
        
        },
       {
        headers:{
         'Content-Type':'application/json'
        }
       })
    
       console.log(res)
        
      return res
    } catch (error) {
        console.log(error)
    }
    }

    const uploadImage = async(url,formData)=>{
      try {
        const {data:{image:{src}}} = await axios.post(`${baseUrl + url}`,formData,{
         headers:{
          'Content-Type':'multipart/form-data'
         }
        })

        return src
  
       } catch (error) { 
     
        console.log(error);
       }
    }

    const updateProfile = async(dynamicURL, settings) => {
      try {
        const res = await axios.put(`${baseUrl}/profile/settings?profileId=${dynamicURL}`,
        {
         ...settings.singularChange
        },
         {
           "Content-Type":"application/json"
         }
        )
        console.log(res)
        //change the elements in the iframe and in the pane


      } catch (error) {
       
      }
    }


    const updateElement = async(dynamicURL,selectedElementId, settings)=>{
      try {
        const res = await axios.put(`${baseUrl}/elements/settings?profileId=${dynamicURL}&elementId=${selectedElementId}`,
        {
         ...settings.singularChange,
         customSetting: settings.customChange
        },
         {
           "Content-Type":"application/json"
         }
        )
        console.log(res)
       
      } catch (error) {
       
      }
    }

    const updateElementPosition = async(dynamicURL, element)=>{
      try {
        const res = await axios.put(`${baseUrl}/elements/position?profileId=${encodeURIComponent(dynamicURL)}&elementId=${encodeURI(element.id)}`,
          {
           left:element.left,
           top:element.top
          },
        {
         'Content-Type':'application/json'
       })
       console.log(res)
      } catch (error) {
       console.log(error)
      }
    }


    const createElement = async(dynamicURL,elementData)=>{
      try {
        // add element to database
       const res = await axios.post(`${baseUrl}/elements?profileId=${dynamicURL}&elementId=${elementData.id}`,
         elementData,
         {
          'Content-Type':'application/json'
        }
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    const deleteElement = async(dynamicURL, prevSelectedId)=>{

      try {
        const res = await axios.delete(`${baseUrl}/elements?profileId=${dynamicURL}&elementId=${prevSelectedId}`)
        console.log(res)
      } catch (error) {
        
      }
    }

   
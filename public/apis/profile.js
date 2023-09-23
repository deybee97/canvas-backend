const baseUrl ="https://canvas-backend.onrender.com/api/v1"
const localUrl = "http://localhost:3000/api/v1"
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

   
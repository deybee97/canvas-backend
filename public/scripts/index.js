
const createProfileBtn = document.getElementById("create-profile")
const confrimCreateProfileBtn = document.getElementById("confirm-create-profile")
const profileNameContainer = document.querySelector(".profile-name-container")
const profileName = document.getElementById("profile-name")
const profileCards = document.getElementsByClassName("project-card")
const url = "http://localhost:3000/"
console.log(profileCards)
createProfileBtn.addEventListener("click",()=>{
    profileNameContainer.style.display = "flex"
    // profileNameContainer.classList.add("visibility")
})

confrimCreateProfileBtn.addEventListener("click",async()=>{
    const id = generateRandomId(12)
try {
    const res = await axios.post(`${url}api/v1/profile/`,
    {
      id,
      profileName: profileName.value,
    
    },
   {
    headers:{
     'Content-Type':'application/json'
    }
   })

   console.log(res)
    
   //redirect to profile/dynamic.page
   if (res.status === 200) {
    // Redirect to profile/dynamic.page
    window.location.href = `/profile/${id}`;
} else {
    console.log("Error creating profile.");
}
} catch (error) {
    console.log(error)
}
  

      
})

Array.from(profileCards).forEach(profileCard=>{
    profileCard.addEventListener("click",()=>{
         window.location.href = `profile/${profileCard.id}`
    })
})
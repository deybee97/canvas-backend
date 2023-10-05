
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
    const response = await createProfile(profileName.value,id)
     console.log(response)
      //redirect to profile/dynamic.page
      if (response.status === 200) {
        // Redirect to profile/dynamic.page
        window.location.href = `/profile/${id}`;
    } else {
        console.log("Error creating profile.");
    }

})

Array.from(profileCards).forEach(profileCard=>{
    profileCard.addEventListener("click",()=>{
         window.location.href = `profile/${profileCard.id}`
    })
})
let submittedPosts = []

let submitPostButton = document.getElementById("submit-post-btn")
let postTitleInput = document.getElementById("post-title-input")
let postDescInput = document.getElementById("post-desc-input")
let postsSection = document.getElementById("postsSection")

let postToEdit = null

submitPostButton.addEventListener('click', () => {
    event.preventDefault()
    let errorMessage = ""
    if (postTitleInput.value == "") {
        errorMessage += "- Missing a Title\n"
    }
    if (postDescInput.value == "") {
        errorMessage += "- Missing a Description"
    }
    if (errorMessage != "") {
        alert(errorMessage)
    }
    else {
        if (localStorage.getItem("postsCreated")) {
            let postsCreated = Number(localStorage.getItem("postsCreated"))
            localStorage.setItem("postsCreated", postsCreated + 1)
        }
        else{
            localStorage.setItem("postsCreated", 1)
        }
        let postNumber = parseInt(localStorage.getItem("postsCreated"))
        let postToSubmit = {postNumber: postNumber++, postTitle: postTitleInput.value, postDesc: postDescInput.value}
        if (postToEdit == null) {
            submittedPosts.push(postToSubmit)
            let newPost = document.createElement("section")
            let newPostTitleBtnContainer = document.createElement("section")
            let newPostTitle = document.createElement("h1")
            let newPostBtn = document.createElement("button")
            let newPostDescription = document.createElement("p")
            newPost.setAttribute("class", "p-[0_100px_0_100px] mt-[20px]")
            newPostTitleBtnContainer.setAttribute("class", "flex")
            newPostTitle.setAttribute("class", "text-[2em]")
            newPostBtn.setAttribute("class", "ml-[12px] mt-[12px] border rounded-[4px] w-[50px] h-[25px] bg-[#ffffff] hover:bg-[#dbdbdb] focus:bg-[#cccccc]")
            newPostBtn.innerHTML = `Edit`
            newPostTitle.innerHTML = postTitleInput.value
            newPostDescription.innerHTML = `${postDescInput.value}<hr class="mt-[15px]">`
            newPostBtn.onclick = editPost
            newPostTitleBtnContainer.appendChild(newPostTitle)
            newPostTitleBtnContainer.appendChild(newPostBtn)
            newPost.appendChild(newPostTitleBtnContainer)
            newPost.appendChild(newPostDescription)
            postsSection.appendChild(newPost)
            postTitleInput.value = ""
            postDescInput.value = ""
            postToSubmit.postContainer = newPost
            //console.log(`Post Number ${postToSubmit.postNumber}`)
        }
        else {
            postToEdit.postContainer.firstElementChild.firstElementChild.innerText = postTitleInput.value
        }
    }
});
function editPost() {
    let postToEditTitle = document.activeElement.previousElementSibling
    let postToEditDesc = document.activeElement.parentElement.nextElementSibling
    postTitleInput.value = postToEditTitle.innerText
    postDescInput.value = postToEditDesc.innerText
    for (let i = 0; i < submittedPosts.length; i++) {
        if (submittedPosts[i].postTitle == postToEditTitle && submittedPosts[i].postDesc == postToEditDesc) {
            postToEdit = submittedPosts[i]
            console.log(postToEdit.postTitle)
        }
    }
    document.activeElement.blur()
}
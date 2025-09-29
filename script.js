let submittedPosts = []

let submitPostButton = document.getElementById("submit-post-btn")
let postTitleInput = document.getElementById("post-title-input")
let postDescInput = document.getElementById("post-desc-input")
let postsSection = document.getElementById("postsSection")

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
        let postToSubmit = {postTitle: postTitleInput.value, postDesc: postDescInput.value}
        submittedPosts.push(postToSubmit)
        let newPost = document.createElement("section")
        let newPostTitle = document.createElement("h1")
        let newPostDescription = document.createElement("p")
        newPost.setAttribute("class", "p-[0_100px_0_100px] mt-[20px]")
        newPostTitle.setAttribute("class", "text-[2em]")
        newPostTitle.innerHTML = postTitleInput.value
        newPostDescription.innerHTML = `${postDescInput.value}<hr class="mt-[15px]">`
        newPost.appendChild(newPostTitle)
        newPost.appendChild(newPostDescription)
        postsSection.appendChild(newPost)
    }
});
function editPost() {
    let postToEditTitle = document.activeElement.previousElementSibling
    let postToEditDesc = document.activeElement.parentElement.nextElementSibling
    postTitleInput.value = postToEditTitle.innerText
    postDescInput.value = postToEditDesc.innerText
    document.activeElement.blur()
}
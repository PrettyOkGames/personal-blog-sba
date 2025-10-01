let submittedPosts = []

let submitPostButton = document.getElementById("submit-post-btn")
let postTitleInput = document.getElementById("post-title-input")
let postDescInput = document.getElementById("post-desc-input")
let postsSection = document.getElementById("postsSection")

let postToEdit = null

submitPostButton.addEventListener('click', (event) => {
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
        if (postToEdit == null) {
            let newPost = document.createElement("section")
            let newPostTitleBtnContainer = document.createElement("section")
            let newPostTitle = document.createElement("h1")
            let newPostEditBtn = document.createElement("button")
            let newPostDeleteBtn = document.createElement("button")
            let newPostDescription = document.createElement("p")
            let lineBreak = document.createElement("hr")
            newPost.setAttribute("class", "p-[0_100px_0_100px] mt-[20px]")
            newPostTitleBtnContainer.setAttribute("class", "flex")
            newPostTitle.setAttribute("class", "text-[2em]")
            newPostEditBtn.setAttribute("class", "ml-[12px] mt-[12px] border rounded-[4px] w-[50px] h-[25px] bg-[#ffffff] hover:bg-[#dbdbdb] focus:bg-[#cccccc]")
            newPostEditBtn.setAttribute("onClick", "editPost()")
            newPostEditBtn.innerHTML = `Edit`
            newPostDeleteBtn.setAttribute("class", "ml-[12px] mt-[12px] border rounded-[4px] w-[50px] h-[25px] bg-[#ffffff] hover:bg-[#dbdbdb] focus:bg-[#cccccc]")
            newPostDeleteBtn.setAttribute("onClick", "removePost()")
            newPostDeleteBtn.innerHTML = `Delete`
            newPostTitle.innerHTML = postTitleInput.value
            newPostDescription.innerText = `${postDescInput.value}`
            lineBreak.setAttribute("class", "mt-[15px] newLineBreak")
            newPostTitleBtnContainer.appendChild(newPostTitle)
            newPostTitleBtnContainer.appendChild(newPostEditBtn)
            newPostTitleBtnContainer.appendChild(newPostDeleteBtn)
            newPost.appendChild(newPostTitleBtnContainer)
            newPost.appendChild(newPostDescription)
            newPost.appendChild(lineBreak)
            postsSection.appendChild(newPost)
            postTitleInput.value = ""
            postDescInput.value = ""
            if (!localStorage.getItem("savedPosts")) {
                localStorage.setItem("savedPosts", "")
            }
            localStorage.setItem("savedPosts", postsSection.innerHTML)
            
        }
        else {
            postToEdit.firstElementChild.firstElementChild.innerText = postTitleInput.value
            postToEdit.children[1].innerText = postDescInput.value
            postTitleInput.value = ""
            postDescInput.value = ""
            postToEdit = null
            if (!localStorage.getItem("savedPosts")) {
                localStorage.setItem("savedPosts", "")
            }
            localStorage.setItem("savedPosts", postsSection.innerHTML)
        }
    }
});
function editPost() {
    let postToEditTitle = document.activeElement.previousElementSibling
    let postToEditDesc = document.activeElement.parentElement.nextElementSibling
    postTitleInput.value = postToEditTitle.innerText
    postDescInput.value = postToEditDesc.innerText
    postToEdit = document.activeElement.parentElement.parentElement
    document.activeElement.blur()
}
function removePost() {
    let postToRemove = document.activeElement.parentElement.parentElement
    postsSection.removeChild(postToRemove)
    if (!localStorage.getItem("savedPosts")) {
        localStorage.setItem("savedPosts", "")
    }
    localStorage.setItem("savedPosts", postsSection.innerHTML)
}

if (localStorage.getItem("savedPosts")) {
    postsSection.innerHTML = localStorage.getItem("savedPosts")
}
const editProfilebtn = document.getElementById('edit-profile-button');
let editProfileFlag = false;

// Inputs & elements
const nameInput = document.getElementById('author-name-input'); // 1
const nameElement = document.getElementById('author-name'); // 2
const titleInput = document.getElementById('author-title-input'); // 3
const titleElement = document.getElementById('author-title'); // 4
const linksDiv = document.getElementById('author-links-div');
const linkNameInput = document.getElementById('author-link-name-input'); // 5
const addLinksButton = document.getElementById('add-link-item-button'); // 6
const linkList = document.getElementById('author-links-list'); // 7
const linkUrlInput = document.getElementById('author-link-url-input');

// initialise variables
let userTitle = titleElement.value;
let links = [];

addLinksButton.addEventListener('click', () => {
    if (linkNameInput.value !== '' && linkUrlInput.value !== '') {
        addLinkItem(linkNameInput.value, linkUrlInput.value);
    }
})

// Add functionality to change text to inputs.
editProfilebtn.addEventListener('click', () => {
    if (!editProfileFlag) {
        toggleInputs()
        editProfilebtn.textContent = 'Save';
        editProfileFlag = true;
    } else {
        toggleInputs();
        let formData = new FormData();
        editProfilebtn.textContent = 'Edit';
        if (titleInput.value !== '') {
            titleElement.textContent = titleInput.value;
            userTitle = titleInput.value;
            formData.append('user-title', userTitle);
        }
        let file = document.querySelector('input[type=file]')['files'][0];
        formData.append('avatar', file);
        console.log(links);
        for (let link of links) {
            formData.append(`links`, JSON.stringify(link));
        }
        postUpdates(formData);
        editProfileFlag = false;
    }
})
function toggleInputs() {
    nameInput.classList.toggle('hide');
    nameElement.classList.toggle('hide');
    titleInput.classList.toggle('hide');
    titleElement.classList.toggle('hide');
    linksDiv.classList.toggle('hide');
}
function addLinkItem(text, link) {
    let linkObject = {
        name: text,
        url: link,
    }
    links.push(linkObject);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = text;
    a.href = link;
    a.target = '_blank';
    li.appendChild(a);
    linkList.appendChild(li);
    linkNameInput.value = '';
    linkUrlInput.value = '';
}
function postUpdates(data) {
    fetch('/Author/Profile/Edit', {
        method: 'POST',
        body: data,
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    })
}
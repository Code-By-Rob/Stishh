let formData = new FormData();

const addTextButton = document.querySelector('#add-text-button');
const addImageButton = document.querySelector('#add-hero-button');
const addTitleButton = document.querySelector('#add-title-button');
const addListButton = document.querySelector('#add-list-button');
const addLinkButton = document.querySelector('#add-link-button');
const addTagButton = document.querySelector('#add-tag-button');
const addImageInputButton = document.querySelector('#add-image-button');
const addEmbedButton = document.querySelector('#add-embed-button');
let listItemNumber = 0;
const articleDoc = document.querySelector('#article');
const articleTitle = document.querySelector('#new-article-title');
const articleDescription = document.querySelector('#new-article-description');
const articleTopic = document.querySelector('#article-topics');
const articleTagInput = document.querySelector('#new-article-tags');
const articleTagsList = document.querySelector('#article-tags-list');

const tldrTextButton = document.querySelector('#add-tldr-text');
const tldrListButton = document.querySelector('#add-tldr-list');
const tldrTitleButton = document.querySelector('#add-tldr-title');
const tldrLinkButton = document.querySelector('#add-tldr-link');
const tldrSection = document.querySelector('#tldr');

// Write a function for each of the button types in the collapsible.
// Adding Text Button
addTextButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Type, paste, cut text here. This is the starting of a new section!';
    textarea.setAttribute('data-content-article-type', 'text');
    textarea.classList.add('content');
    textarea.classList.add('mt-3');
    articleDoc.appendChild(textarea);
});
// Adding Title Button
addTitleButton.addEventListener('click', () => {
    const titlearea = document.createElement('input');
    titlearea.placeholder = 'Enter a subtitle here!';
    titlearea.classList.add('title-area');
    titlearea.classList.add('content');
    titlearea.classList.add('mt-3');
    titlearea.setAttribute('data-content-article-type', 'title');
    articleDoc.appendChild(titlearea);
})
// Adding list button function
addListButton.addEventListener('click', () => {
    const listinput = document.createElement('input');
    const listbutton = document.createElement('button')
    const list = document.createElement('ul');
    listinput.placeholder = 'Type out an item for your list!';
    listinput.classList.add('list-input');
    listinput.classList.add('mt-3');
    listbutton.classList.add('btn');
    listbutton.classList.add('btn-primary-colour');
    listbutton.classList.add('mt-1');
    listbutton.textContent = 'Add Item';
    listbutton.id = 'add-list-item-button';
    list.classList.add('list');
    list.classList.add('content');
    list.classList.add('mt-3');
    list.setAttribute('data-content-article-type', 'list');

    articleDoc.appendChild(listinput);
    articleDoc.appendChild(listbutton);
    articleDoc.appendChild(list);

    listItemNumber++;
    listbutton.addEventListener('click', () => {
        const listitem = listinput.value;
        addListItemButtonCallback(listitem, list);
        listinput.value = '';
    });
})
function addListItemButtonCallback(listitem, list) {
    const li = document.createElement('li');
    li.textContent = listitem;
    li.classList.add('list-item');
    list.appendChild(li);
}
// Add link functionality
addLinkButton.addEventListener('click', () => {
    const divinput = document.createElement('div');
    divinput.classList.add('input-group');
    divinput.classList.add('mt-3');
    const span = document.createElement('span');
    span.classList.add('input-group-text')
    span.textContent = 'https://example.com/';
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.classList.add('content');
    input.setAttribute('data-content-article-type', 'linkitem');
    divinput.appendChild(span);
    divinput.appendChild(input);
    articleDoc.appendChild(divinput);
})
// Add tags functionality
addTagButton.addEventListener('click', () => {
    const tagValue = articleTagInput.value;
    const li = document.createElement('li');
    li.textContent = `#${tagValue}`
    li.classList.add('list-inline-item');
    articleTagsList.appendChild(li);
    articleTagInput.value = '';
})
// Add image functionality
addImageInputButton.addEventListener('click', () => {
    const imageInput = document.createElement('input');
    imageInput.classList.add('mt-4');
    imageInput.classList.add('image-content');
    imageInput.classList.add('content'); 
    imageInput.setAttribute('data-content-article-type', 'image');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    articleDoc.appendChild(imageInput);
})
// Add embed functionality
addEmbedButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter embedded content here!';
    input.classList.add('form-control');
    input.classList.add('content');
    input.classList.add('mt-3');
    input.setAttribute('data-content-article-type', 'embedded');
    articleDoc.appendChild(input);
})

// Add TL;DR text functionality
tldrTextButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Type, paste, cut text here!';
    textarea.setAttribute('data-content-article-type', 'tldr-text');
    textarea.classList.add('content');
    textarea.classList.add('mt-3');
    tldrSection.appendChild(textarea);
});
// Add TL;DR list functionality
tldrListButton.addEventListener('click', () => {
    const listinput = document.createElement('input');
    const listbutton = document.createElement('button')
    const list = document.createElement('ul');
    listinput.placeholder = 'Type out an item for your list!';
    listinput.classList.add('list-input');
    listinput.classList.add('mt-3');
    listbutton.classList.add('btn');
    listbutton.classList.add('btn-primary-colour');
    listbutton.classList.add('mt-1');
    listbutton.textContent = 'Add Item';
    listbutton.id = 'add-list-item-button';
    list.classList.add('list');
    list.classList.add('content');
    list.classList.add('mt-3');
    list.setAttribute('data-content-article-type', 'tldr-list');

    tldrSection.appendChild(listinput);
    tldrSection.appendChild(listbutton);
    tldrSection.appendChild(list);

    listItemNumber++;
    listbutton.addEventListener('click', () => {
        const listitem = listinput.value;
        addListItemButtonCallback(listitem, list);
        listinput.value = '';
    });
})
// Adding TL;DR title functionality
tldrTitleButton.addEventListener('click', () => {
    const titlearea = document.createElement('input');
    titlearea.placeholder = 'Enter a subtitle here!';
    titlearea.classList.add('title-area');
    titlearea.classList.add('content');
    titlearea.classList.add('mt-3');
    titlearea.setAttribute('data-content-article-type', 'tldr-title');
    tldrSection.appendChild(titlearea);
})
// Add TL;DR link functionality
tldrLinkButton.addEventListener('click', () => {
    const divinput = document.createElement('div');
    divinput.classList.add('input-group');
    divinput.classList.add('mt-3');
    const span = document.createElement('span');
    span.classList.add('input-group-text')
    span.textContent = 'link';
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.classList.add('content');
    input.style.fontSize = '16px';
    input.setAttribute('data-content-article-type', 'tldr-linkitem');
    divinput.appendChild(span);
    divinput.appendChild(input);
    tldrSection.appendChild(divinput);
})

// let base64String = '';
// function imageUpload() {
//     let file = document.querySelector('input[type=file]')['files'][0];
//     let reader = new FileReader();
//     console.log('got here!')
//     reader.onload = function () {
//         base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
//         imageBase64Strinsep = base64String;
//         console.log(base64String);
//         console.log('got here!')
//     }
//     reader.readAsDataURL(file);
// }
const tx = document.getElementsByTagName('textarea');
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px:overflow-y:hidden;');
    tx[i].addEventListener('input', OnInput, false);
}
function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}

const postArticleButton = document.querySelector('#post-article-button');
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
postArticleButton.addEventListener('click', () => {
    const articleContent = document.querySelectorAll('.content')
    formData.append('Title', articleTitle.value);
    formData.append('Description', articleDescription.value);
    let file = document.querySelector('input[type=file]')['files'][0];
    formData.append('ImageHero', file);
    let content = [];
    let numOfWords = 0;
    let imageFileNum = 0;
    for (let i = 0; i < articleContent.length; i++) {
        switch(articleContent[i].getAttribute('data-content-article-type')) {
            case 'text':
                const textObject = {'text': articleContent[i].value};
                content.push(textObject);
                numOfWords = numOfWords + articleContent[i].value.split(' ').length;
                break;
            case 'title':
                const titleObject = {'title': articleContent[i].value};
                content.push(titleObject);
                numOfWords = numOfWords + articleContent[i].value.split(' ').length;
                break;
            case 'list':
                const listitems = [];
                [...articleContent[i].children].forEach(el => listitems.push(el.textContent));
                const listObject = {'list': listitems};
                content.push(listObject);
                break;
            case 'linkitem':
                const linkObject = {'linkitem': articleContent[i].value};
                content.push(linkObject);
                break;
            case 'image':
                const imageObject = {'image': imageFileNum};
                console.log('got here');
                imageFileNum++;
                content.push(imageObject);
                break;
            case 'embedded':
                const embeddedObject = {'embedded': articleContent[i].value};
                content.push(embeddedObject);
                break;
            case 'tldr-text':
                const tldrTextObject = {'tldr-text': articleContent[i].value};
                content.push(tldrTextObject);
                break;
            case 'tldr-list':
                const tldrlistitems = [];
                [...articleContent[i].children].forEach(el => tldrlistitems.push(el.textContent));
                const tldrListObject = {'tldr-list': tldrlistitems};
                content.push(tldrListObject);
                break;
            case 'tldr-title':
                const tldrTitleObject = {'tldr-title': articleContent[i].value};
                content.push(tldrTitleObject);
                numOfWords = numOfWords + articleContent[i].value.split(' ').length;
                break;
            case 'tldr-linkitem':
                const tldrLinkObject = {'tldr-linkitem': articleContent[i].value};
                content.push(tldrLinkObject);
                break;
        }
    }
    const images = document.querySelectorAll('.image-content');
    try {
        for (let j = 0; j < images.length; j++) {
            formData.append(`Images`, images[j]['files'][0]);
        }
    } catch(err) {
        console.log(err);
    }
    console.log(content);
    formData.append('Content', JSON.stringify(content));
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = monthNames[date.getUTCMonth()];
    let day = date.getUTCDate()
    let ymd = `${year}, ${month}, ${day}`;
    formData.append('Date', ymd);
    formData.append('Topic', articleTopic.value);
    formData.append('ReadTime', (numOfWords / 200));
    const tagsList = [];
    [...articleTagsList.children].forEach(el => tagsList.push(el.textContent));
    formData.append('Tags', JSON.stringify(tagsList));
    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    postArticleToDatabase();
});
function postArticleToDatabase(link) {
    fetch('/Author/create-article', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success: ', data);
    })
    .catch(err => {
        console.log(err);
    })
}
let firstDraftFlag = true;
let draftID = null;
const createDraftBtn = document.getElementById('create-draft-btn');
try {
    draftID = createDraftBtn.getAttribute('data-article-id');
} catch(err) {
    console.log(err);
}
try {
    createDraftBtn.addEventListener('click', () => {
        const draftContent = document.querySelectorAll('.content')
        let draftFormData = new FormData();
        draftFormData.append('_id', draftID);
        draftFormData.append('Title', articleTitle.value);
        draftFormData.append('Description', articleDescription.value);
        let file = document.querySelector('input[type=file]')['files'][0];
        draftFormData.append('ImageHero', file);
        let content = [];
        let numOfWords = 0;
        let imageFileNum = 0;
        for (let i = 0; i < draftContent.length; i++) {
            switch(draftContent[i].getAttribute('data-content-article-type')) {
                case 'text':
                    const textObject = {'text': draftContent[i].value};
                    content.push(textObject);
                    numOfWords = numOfWords + draftContent[i].value.split(' ').length;
                    break;
                case 'title':
                    const titleObject = {'title': draftContent[i].value};
                    content.push(titleObject);
                    numOfWords = numOfWords + draftContent[i].value.split(' ').length;
                    break;
                case 'list':
                    const listitems = [];
                    [...draftContent[i].children].forEach(el => listitems.push(el.textContent));
                    const listObject = {'list': listitems};
                    content.push(listObject);
                    break;
                case 'linkitem':
                    const linkObject = {'linkitem': draftContent[i].value};
                    content.push(linkObject);
                    break;
                case 'image':
                    const imageObject = {'image': imageFileNum};
                    console.log('got here');
                    imageFileNum++;
                    content.push(imageObject);
                    break;
                case 'embedded':
                    const embeddedObject = {'embedded': draftContent[i].value};
                    content.push(embeddedObject);
                    break;
                case 'tldr-text':
                    const tldrTextObject = {'tldr-text': draftContent[i].value};
                    content.push(tldrTextObject);
                    break;
                case 'tldr-list':
                    const tldrlistitems = [];
                    [...draftContent[i].children].forEach(el => tldrlistitems.push(el.textContent));
                    const tldrListObject = {'tldr-list': tldrlistitems};
                    content.push(tldrListObject);
                    break;
                case 'tldr-title':
                    const tldrTitleObject = {'tldr-title': draftContent[i].value};
                    content.push(tldrTitleObject);
                    numOfWords = numOfWords + draftContent[i].value.split(' ').length;
                    break;
                case 'tldr-linkitem':
                    const tldrLinkObject = {'tldr-linkitem': draftContent[i].value};
                    content.push(tldrLinkObject);
                    break;
            }
        }
        const images = document.querySelectorAll('.image-content');
        try {
            for (let j = 0; j < images.length; j++) {
                draftFormData.append(`Images`, images[j]['files'][0]);
            }
        } catch(err) {
            console.log(err);
        }
        console.log(content);
        draftFormData.append('Content', JSON.stringify(content));
        let date = new Date();
        let year = date.getUTCFullYear();
        let month = monthNames[date.getUTCMonth()];
        let day = date.getUTCDate()
        let ymd = `${year}, ${month}, ${day}`;
        draftFormData.append('Date', ymd);
        draftFormData.append('Topic', articleTopic.value);
        draftFormData.append('ReadTime', (numOfWords / 200));
        const tagsList = [];
        [...articleTagsList.children].forEach(el => tagsList.push(el.textContent));
        draftFormData.append('Tags', JSON.stringify(tagsList));
        for (let pair of draftFormData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        if (draftID === null) {
            postDraftToDatabase('/Author/create-draft', draftFormData);
            firstDraftFlag = false;
            createDraftBtn.textContent = 'Save Draft';
        } else {
            postDraftToDatabase('/Author/save-draft', draftFormData);
        }
    });
} catch (err) {
    console.log(err);
}
function postDraftToDatabase(link, data) {
    fetch(link, {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success: ', data);
        if (!firstDraftFlag) {
            console.log(data);
            draftID = data.draftId;
        }
    })
    .catch(err => {
        console.log(err);
    })
}
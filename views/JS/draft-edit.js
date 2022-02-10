const previewDraft = document.getElementById('preview-draft-btn');
try {
    previewDraft.addEventListener('click', () => {
        const draftContent = document.querySelectorAll('.content')
        let draftFormData = new FormData();
        draftFormData.append('_id', previewDraft.getAttribute('data-article-id'));
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
        postDraftToDatabase('/Author/save-draft', draftFormData);
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
    .then(info => {
        console.log('Got Here Successful Post!');
        console.log(info);
    })
    .catch(err => {
        console.log(err);
    })
}
const photoSubmitButton = document.getElementById('photo-submit-button');
photoSubmitButton.addEventListener('click', () => {
    let formData = new FormData();
    let file = document.querySelector('input[type=file]')['files'][0];
    formData.append('avatar', file);
    fetch('/Author/New-Login', {
        method: 'POST',
        body: formData,
    }).catch(err => {
        console.log(err);
    })
})
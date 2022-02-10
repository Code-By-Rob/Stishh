const deleteDraftBtn = document.querySelectorAll('.remove-draft-button');
const editDraftBtn = document.querySelectorAll('.edit-draft-button');
deleteDraftBtn.forEach(el => {
    el.addEventListener('click', () => {
        deleteDraft(el.id);
    })
})
function deleteDraft(id) {
    fetch('/Author/drafts-delete', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            _id: id
        }),
    }).then(res => res.json())
    .then(data => console.log(data));
}
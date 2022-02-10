console.log('accessed article.js');
const embeddedItems = document.querySelectorAll('.embedded');
    embeddedItems.forEach(el => {
        console.log(el.textContent);
        el.appendChild(domParse(el.textContent));
        el.firstChild.remove();
})
function domParse(string) {
    const parser = new DOMParser();
    let doc = parser.parseFromString(string, 'text/html');
    return doc.body.firstElementChild;
}
console.log(screen.width);
if (screen.width > 992) {
    let controller = new ScrollMagic.Controller();
    let scene1 = new ScrollMagic.Scene({
        triggerElement: '#trigger1',
        duration: window.clientHeight,
        triggerHook: 0.05
    })
    .setPin('#article-details', {pushFollowers: false});
    let scene2 = new ScrollMagic.Scene({
        triggerElement: '#trigger2',
        duration: window.clientHeight,
        triggerHook: 0.05
    })
    .setPin('#article-share', {pushFollowers: false});
    controller.addScene([scene1, scene2]);
}
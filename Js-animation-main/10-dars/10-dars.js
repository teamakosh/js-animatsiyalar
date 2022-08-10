const highlighter = document.querySelector('.highlighter');
const navItems = document.querySelectorAll('.nav__item');

 
navItems.forEach((cur, index) => {
    cur.addEventListener('mouseenter', handleEnter);
    cur.addEventListener('mouseleave', handleLeave);
});


function handleEnter() {

    var subMenuCords = this.querySelector('.nav__submenu').getBoundingClientRect();
    
    highlighter.classList.add('open');
    

    var allCords = {
        left: subMenuCords.left,
        top: subMenuCords.top,
        height: subMenuCords.height,
        width: subMenuCords.width,
    }

    highlighter.style.width = `${allCords.width}px`;
    highlighter.style.height = `${allCords.height}px`;
    highlighter.style.left = `${allCords.left}px`;
    highlighter.style.top = `${allCords.top}px`;

}

function handleLeave() {
    highlighter.classList.remove('open');
    
}
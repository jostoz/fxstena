/* sticky-menu.js | https://www.indonez.com | Indonez | MIT License */
class StickyMenu {
    constructor() {
        this.navbarName = 'navbar'            // navbar class name as sticky reference element
        this.paddingName = 'py-2'             // usually bootstrap padding class name, use to remove it in sticky mode
        this.showOnUp = true                  // true mean sticky only active when mouse sroll up
    }

    init() {
        if (document.querySelector(`.${this.navbarName}`) !== null) {
            // required variables
            this.navbarEl = document.querySelector(`.${this.navbarName}`)
            this.cloneNav = this.navbarEl.querySelector('.navbar-nav').cloneNode(true)
            this.clonedNavMobile = document.querySelector('.btn-mobile-navbar').cloneNode(true)
            this.clonedlogo = document.querySelector('.navbar-brand').cloneNode(true)

            // manipulate cloned navbar
            this.parentNav = this.navbarEl.parentElement
            this.stickyNav = document.createElement('nav')
            this.stickyNav.innerHTML = `
            <div class="container">
                ${this.clonedlogo.outerHTML}
                <div class="d-none d-lg-block">
                    ${this.cloneNav.outerHTML}
                </div>
                ${this.clonedNavMobile.outerHTML}
            </div>
            `

            this.parentNav.insertBefore(this.stickyNav, this.navbarEl.nextSibling)
            this.stickyNav.classList.add('sticky-nav', 'navbar', 'navbar-expand', 'navbar-light')

            // scroll event action
            let oldValue = 0
            let newValue = 0
            window.addEventListener('scroll', () => {
                if (this.showOnUp) {
                    newValue = window.pageYOffset
                    if (oldValue > newValue) this.stickyNav.classList.add('active')
                    if (oldValue < newValue) this.stickyNav.classList.remove('active')
                    if (window.scrollY < 350) this.stickyNav.classList.remove('active')
                    oldValue = newValue
                } else {
                    window.scrollY > 350 ? this.stickyNav.classList.add('active') : this.stickyNav.classList.remove('active')
                }
            })
        }
    }
}

new StickyMenu().init()
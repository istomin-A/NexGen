class Header {
    selectors = {
        root: '[data-js-header]',
        headerBody: '[data-js-header-body]',
        menuBody: '[data-js-menu-body]',
        burger: '[data-js-burger]',
        menuLinks: '[data-js-menu-link]'
    }

    stateClasses = {
        isActive: '_active',
        isLock: '_lock',
    }

    ariaAttribute = {
        ariaExpanded: 'aria-expanded',
        ariaLabel: 'aria-label'
    }

    stateAriaAttribute = {
        ariaExpandedTrue: true,
        ariaExpandedFalse: false,
        ariaLabelOpen: 'Open menu',
        ariaLabelClose: 'Close menu',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.headerBodyElement = this.rootElement.querySelector(this.selectors.headerBody)
        this.menuBodyElement = this.rootElement.querySelector(this.selectors.menuBody)
        this.burgerElement = this.rootElement.querySelector(this.selectors.burger)
        this.menuLinksElements = this.rootElement.querySelectorAll(this.selectors.menuLinks)
        this.bindEvents()
    }

    clickMenuLinks = () => {
        document.body.classList.remove(this.stateClasses.isLock)
        this.burgerElement.classList.remove(this.stateClasses.isActive)
        this.menuBodyElement.classList.remove(this.stateClasses.isActive)
        this.burgerElement.setAttribute(this.ariaAttribute.ariaExpanded, this.stateAriaAttribute.ariaExpandedFalse)
        this.burgerElement.setAttribute(this.ariaAttribute.ariaLabel, this.stateAriaAttribute.ariaLabelOpen)
    }

    toggleBurger = () => {
        this.burgerElement.classList.toggle(this.stateClasses.isActive)
        this.menuBodyElement.classList.toggle(this.stateClasses.isActive)
        document.body.classList.toggle(this.stateClasses.isLock)

        this.burgerElement.setAttribute(this.ariaAttribute.ariaExpanded, this.stateAriaAttribute.ariaExpandedFalse)
        this.burgerElement.setAttribute(this.ariaAttribute.ariaLabel, this.stateAriaAttribute.ariaLabelOpen)

        if (this.burgerElement.classList.contains(this.stateClasses.isActive)) {
            this.burgerElement.setAttribute(this.ariaAttribute.ariaExpanded, this.stateAriaAttribute.ariaExpandedTrue)
            this.burgerElement.setAttribute(this.ariaAttribute.ariaLabel, this.stateAriaAttribute.ariaLabelClose)

            this.menuLinksElements.forEach(link => link.addEventListener('click', this.clickMenuLinks))
        }
    }

    scrollHeader = () => {
        const scrollPosition = window.scrollY

        if (scrollPosition >= 50) {
            this.rootElement.classList.add('_scroll')
            this.headerBodyElement.classList.add('_scroll')
        } else {
            this.rootElement.classList.remove('_scroll')
            this.headerBodyElement.classList.remove('_scroll')
        }
    }

    bindEvents() {
        this.burgerElement.addEventListener('click', this.toggleBurger)
        window.addEventListener('scroll', this.scrollHeader)
    }
}

export default Header
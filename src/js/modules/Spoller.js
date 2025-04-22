const rootElement = '[data-spollers]'

class Spoller {
    selectors = {
        root: rootElement,
        button: '[data-spoller-button]',
        icon: '[data-spoller-icon]',
        body: '[data-spoller-body]'
    }

    stateClases = {
        isActive: '_active'
    }

    stateAttributes = {
        ariaExpanded: 'aria-expanded',
        ariaHidden: 'aria-hidden',
        ariaControls: 'aria-controls',
        id: 'id',
        style: 'style'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.spollerButton = this.rootElement.querySelector(this.selectors.button)
        this.spollerIcon = this.rootElement.querySelector(this.selectors.icon)
        this.spollerBody = this.rootElement.querySelector(this.selectors.body)
        this.initSpoller()
    }

    toggleSpoller = () => {
        const isOpen = this.spollerBody.style.display === 'none'

        // Меняю aria атрибуты
        this.spollerButton.setAttribute(this.stateAttributes.ariaExpanded, isOpen)
        this.spollerBody.setAttribute(this.stateAttributes.ariaHidden, !isOpen)

        // Общие стили для анимации споллера
        this.spollerBody.style.display = 'block'
        this.spollerBody.style.overflow = 'hidden'
        this.spollerBody.style.transition = 'max-height 300ms ease-in-out 0s'

        // Работа с классами
        this.spollerButton.classList.toggle(this.stateClases.isActive, isOpen)
        this.spollerBody.classList.toggle(this.stateClases.isActive, isOpen)
        this.spollerIcon?.classList.toggle(this.stateClases.isActive, isOpen)

        if (isOpen) {
            // Анимация открытия споллера
            this.spollerBody.style.maxHeight = '0px'
            this.spollerBody.style.maxHeight = this.spollerBody.scrollHeight + 'px'
            setTimeout(() => this.spollerBody.removeAttribute(this.stateAttributes.style), 300) // 300 мс соответствует длительности transition
        } else {
            // Анимация закрытия споллера
            this.spollerBody.style.maxHeight = this.spollerBody.scrollHeight + 'px'
            requestAnimationFrame(() => this.spollerBody.style.maxHeight = '0px')
            setTimeout(() => {
                this.spollerBody.removeAttribute('style')
                this.spollerBody.style.display = 'none'
            }, 300) // 300 мс соответствует длительности transition
        }
    }

    initSpoller() {
        // Инлайн стили при загрузке стр
        this.spollerBody.style.display = 'none'
        this.spollerButton.setAttribute(this.stateAttributes.ariaExpanded, 'false')
        this.spollerBody.setAttribute(this.stateAttributes.ariaHidden, 'true')
        this.spollerButton.setAttribute(this.stateAttributes.ariaControls, this.spollerBody.getAttribute(this.stateAttributes.id))

        this.spollerButton.addEventListener('click', this.toggleSpoller)
    }
}

class SpollerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootElement).forEach((element) => new Spoller(element))
    }
}

export default SpollerCollection
import Swiper from 'swiper'
import { Scrollbar, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'

const rootElement = '[data-js-slider]'

class Slider {
    selectors = {
        scrollbarElement: '[data-js-slider-scrollbar]'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.sliderScrollbarElement = this.rootElement.querySelector(this.selectors.scrollbarElement)
        this.initSlider()
    }

    initSlider() {
        new Swiper(this.rootElement, {
            modules: [Scrollbar, Autoplay],

            speed: 800,
            spaceBetween: 20,
            slidesPerView: 4,

            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                767.98: {
                    slidesPerView: 2,
                },
                991.98: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1440.98: {
                    slidesPerView: 4,
                }
            },

            scrollbar: {
                el: this.sliderScrollbarElement,
            },

            autoplay: {
                delay: 5000,
            },
        })
    }
}

class SliderCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootElement).forEach((element) => new Slider(element))
    }
}

export default SliderCollection
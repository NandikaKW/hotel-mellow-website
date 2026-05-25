import { useEffect } from 'react'
import AOS from 'aos'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'

export const useAnimations = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
            offset: 50
        })

        // Small delay to ensure DOM is ready
        const initSwiper = setTimeout(() => {
            // Initialize Room Swiper only (Gallery is initialized in its own component)
            const roomSwiperElement = document.querySelector('.room-swiper')
            if (roomSwiperElement && !roomSwiperElement.swiper) {
                new Swiper('.room-swiper', {
                    modules: [Pagination, Autoplay],
                    slidesPerView: 1,
                    spaceBetween: 24,
                    pagination: {
                        el: '.room-pagination',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    },
                });
            }
        }, 100)

        return () => {
            clearTimeout(initSwiper)
            const roomSwiper = document.querySelector('.room-swiper')?.swiper
            if (roomSwiper) roomSwiper.destroy(true, true)
        }
    }, [])
}
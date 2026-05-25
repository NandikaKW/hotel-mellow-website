import { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { EffectFade, Navigation, Autoplay, Pagination } from 'swiper/modules'

const GallerySection = () => {
    const galleryRef = useRef(null)
    const swiperInstance = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (galleryRef.current && !swiperInstance.current) {
                swiperInstance.current = new Swiper(galleryRef.current, {
                    modules: [EffectFade, Navigation, Autoplay, Pagination],
                    effect: 'fade',
                    speed: 1000,
                    navigation: {
                        nextEl: '.gallery-button-next',
                        prevEl: '.gallery-button-prev',
                    },
                    pagination: {
                        el: '.gallery-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    loop: true,
                    allowTouchMove: true,
                    on: {
                        slideChange: () => {
                            if (swiperInstance.current) {
                                setActiveIndex(swiperInstance.current.realIndex)
                            }
                        }
                    }
                })
            }
        }, 100)

        return () => {
            clearTimeout(timer)
            if (swiperInstance.current) {
                swiperInstance.current.destroy(true, true)
                swiperInstance.current = null
            }
        }
    }, [])

    const galleryImages = [
        {
            src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
            thumbnail: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
            alt: 'Luxury Suite',
            title: 'Luxury Suite',
            description: 'Elegant comfort with panoramic views'
        },
        {
            src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
            thumbnail: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
            alt: 'Grand Lobby',
            title: 'Grand Lobby',
            description: 'Welcoming atmosphere with modern design'
        },
        {
            src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
            thumbnail: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
            alt: 'Infinity Pool',
            title: 'Infinity Pool',
            description: 'Relaxation with stunning city views'
        },
        {
            src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
            thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
            alt: 'Fine Dining',
            title: 'Fine Dining',
            description: 'Exquisite culinary experiences'
        },
        {
            src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
            thumbnail: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
            alt: 'Spa & Wellness',
            title: 'Spa & Wellness',
            description: 'Rejuvenate your mind and body'
        },
        {
            src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
            thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
            alt: 'Executive Lounge',
            title: 'Executive Lounge',
            description: 'Premium amenities for business travelers'
        }
    ]

    return (
        <section id="gallery" className="gallery-section padding-medium">
            <div className="container" data-aos="fade-up">
                {/* Section Header */}
                <div className="text-center mb-5">
                    <h2 className="display-3 fw-normal mb-3">Our Gallery</h2>
                    <p className="col-lg-7 mx-auto text-muted">
                        Discover the elegance and sophistication of Hotel Mellow through our curated collection
                        of stunning visuals. Each space tells a story of comfort and luxury.
                    </p>
                </div>

                {/* Main Slider */}
                <div className="gallery-slider-wrapper">
                    <div className="swiper gallery-main-swiper" ref={galleryRef}>
                        <div className="swiper-wrapper">
                            {galleryImages.map((image, index) => (
                                <div key={index} className="swiper-slide">
                                    <div className="gallery-slide-inner">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="gallery-main-image"
                                        />
                                        <div className="gallery-slide-overlay">
                                            <div className="gallery-slide-content">
                                                <h3 className="gallery-slide-title">{image.title}</h3>
                                                <p className="gallery-slide-description">{image.description}</p>
                                                <div className="gallery-slide-icon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                        <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"></path>
                                                        <path d="M12 6v6l4 2"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Custom Navigation Buttons */}
                        <button className="gallery-nav-btn gallery-button-prev">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button className="gallery-nav-btn gallery-button-next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Pagination */}
                        <div className="gallery-pagination"></div>
                    </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="gallery-thumbnails mt-5">
                    <div className="row g-3">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="col-6 col-md-4 col-lg-2">
                                <div
                                    className={`gallery-thumbnail ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => {
                                        if (swiperInstance.current) {
                                            swiperInstance.current.slideToLoop(index)
                                        }
                                    }}
                                >
                                    <img src={image.thumbnail} alt={image.alt} />
                                    <div className="thumbnail-overlay">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"></path>
                                            <path d="M12 6v6l4 2"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gallery-section {
                    background: linear-gradient(135deg, #ffffff 0%, #faf9f8 100%);
                    position: relative;
                    overflow: hidden;
                }
            `}</style>
        </section>
    )
}

export default GallerySection
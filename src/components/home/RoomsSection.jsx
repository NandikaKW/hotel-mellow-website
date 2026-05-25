import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'

const RoomsSection = () => {
    const roomSwiperRef = useRef(null)

    useEffect(() => {
        if (roomSwiperRef.current) {
            const roomSwiper = new Swiper(roomSwiperRef.current, {
                modules: [Pagination, Autoplay],
                slidesPerView: 1,
                spaceBetween: 24,
                pagination: {
                    el: ".room-pagination",
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
            })

            return () => {
                if (roomSwiper) roomSwiper.destroy(true, true)
            }
        }
    }, [])

    const rooms = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600',
            title: 'Grand Deluxe Rooms',
            price: 299,
            displayPrice: 269,
            size: '10 ft',
            capacity: 'Max person 2',
            bed: 'King Size Bed',
            services: ['Wifi', 'Television', 'Bathroom', 'Mini Bar']
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
            title: 'Sweet Family Room',
            price: 360,
            displayPrice: 360,
            size: '12 ft',
            capacity: 'Max person 4',
            bed: '2 Double Beds',
            services: ['Wifi', 'Television', 'Bathroom', 'Kitchenette']
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
            title: 'Perfect Double Room',
            price: 450,
            displayPrice: 450,
            size: '10 ft',
            capacity: 'Max person 2',
            bed: 'Queen Size Bed',
            services: ['Wifi', 'Television', 'Bathroom', 'Balcony']
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
            title: 'Luxury Suite',
            price: 550,
            displayPrice: 550,
            size: '15 ft',
            capacity: 'Max person 3',
            bed: 'King Size Bed',
            services: ['Wifi', 'Television', 'Bathroom', 'Mini Bar', 'Living Area']
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
            title: 'Presidential Suite',
            price: 899,
            displayPrice: 899,
            size: '20 ft',
            capacity: 'Max person 5',
            bed: '2 King Size Beds',
            services: ['Wifi', 'Television', 'Bathroom', 'Kitchen', 'Balcony', 'Pool Access']
        }
    ]

    return (
        <section id="room" className="padding-medium">
            <div className="container-fluid padding-side" data-aos="fade-up">
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-5">
                    <div>
                        <h2 className="display-3 fw-normal">Explore our rooms</h2>
                    </div>
                    <a href="/rooms" className="btn btn-primary btn-arrow">
                        <span>Explore all rooms</span>
                        <svg width="18" height="18">
                            <use href="#arrow-right"></use>
                        </svg>
                    </a>
                </div>

                <div className="swiper room-swiper mt-3" ref={roomSwiperRef}>
                    <div className="swiper-wrapper">
                        {rooms.map((room) => (
                            <div key={room.id} className="swiper-slide">
                                <div className="room-card">
                                    <div className="room-card-inner">
                                        <div className="room-image-wrapper">
                                            <img
                                                src={room.image}
                                                alt={room.title}
                                                className="room-image"
                                            />
                                            <div className="room-price-tag">
                                                <span className="price-amount">${room.displayPrice}</span>
                                                <span className="price-period">/night</span>
                                            </div>
                                        </div>

                                        <div className="room-info">
                                            <h3 className="room-title">{room.title}</h3>
                                            <div className="room-features">
                                                <div className="feature-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                                                        <line x1="8" y1="21" x2="8" y2="15"></line>
                                                        <line x1="16" y1="21" x2="16" y2="15"></line>
                                                        <line x1="2" y1="11" x2="22" y2="11"></line>
                                                    </svg>
                                                    <span>{room.size}</span>
                                                </div>
                                                <div className="feature-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                    <span>{room.capacity}</span>
                                                </div>
                                                <div className="feature-item">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M2 12h20"></path>
                                                        <path d="M12 2v20"></path>
                                                    </svg>
                                                    <span>{room.bed}</span>
                                                </div>
                                            </div>
                                            <div className="room-services">
                                                {room.services.slice(0, 4).map((service, idx) => (
                                                    <span key={idx} className="service-badge">{service}</span>
                                                ))}
                                                {room.services.length > 4 && (
                                                    <span className="service-badge">+{room.services.length - 4} more</span>
                                                )}
                                            </div>
                                            <a href={`/room-details/${room.id}`} className="room-btn">
                                                Browse Now
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination room-pagination position-relative mt-5"></div>
                </div>
            </div>
        </section>
    )
}

export default RoomsSection
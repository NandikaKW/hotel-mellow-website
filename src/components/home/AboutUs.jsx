import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import aboutImg1 from '../../assets/images/about-img1.jpg'
import aboutImg2 from '../../assets/images/about-img2.jpg'
import aboutImg3 from '../../assets/images/about-img3.jpg'

const AboutUs = () => {
    const counterRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.stat-number')
                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = parseInt(counter.getAttribute('data-target'))
                            const current = parseInt(counter.innerText)
                            const increment = target / 50
                            if (current < target) {
                                counter.innerText = Math.ceil(current + increment)
                                setTimeout(updateCount, 40)
                            } else {
                                counter.innerText = target
                            }
                        }
                        updateCount()
                    })
                    observer.disconnect()
                }
            })
        }, { threshold: 0.5 })

        if (counterRef.current) {
            observer.observe(counterRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const stats = [
        { value: 25, label: 'Years of Excellence', suffix: '+' },
        { value: 5000, label: 'Happy Guests', suffix: '+' },
        { value: 160, label: 'Luxury Rooms', suffix: '' },
        { value: 25, label: 'Award Wins', suffix: '' }
    ]

    return (
        <section id="about-us" className="about-section">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-5" data-aos="fade-up">
                    <span className="about-subtitle">Welcome to Paradise</span>
                    <h2 className="display-3 fw-normal mb-3">Mellow: Your Gateway to Serenity</h2>
                    <p className="col-lg-7 mx-auto text-muted">
                        Discover a world where comfort meets tranquility, and every stay becomes an unforgettable experience.
                    </p>
                </div>

                <div className="row align-items-center g-5">
                    {/* Left Content */}
                    <div className="col-lg-6" data-aos="fade-right">
                        <div className="about-content">
                            <h3 className="about-quote">"Where Luxury Meets Comfort"</h3>
                            <p className="about-text">
                                Welcome to Hotel Mellow, where comfort meets tranquility. Nestled in the heart of a bustling city,
                                our hotel offers a peaceful retreat for both business and leisure travelers. With modern amenities,
                                and a warm, inviting atmosphere, we strive to make your stay with us truly memorable.
                            </p>
                            <p className="about-text">
                                Every detail at Hotel Mellow is designed with your comfort in mind. From our luxurious rooms
                                to our world-class facilities, we ensure that your experience exceeds expectations.
                            </p>

                            {/* Features List */}
                            <div className="about-features">
                                <div className="feature">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span>Premium Quality Service</span>
                                </div>
                                <div className="feature">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                    <span>Modern Amenities</span>
                                </div>
                                <div className="feature">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 6v6l4 2"></path>
                                    </svg>
                                    <span>24/7 Customer Support</span>
                                </div>
                            </div>

                            <Link to="/about" className="about-btn">
                                Read About Us
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="col-lg-6" data-aos="fade-left">
                        <div className="about-images">
                            <div className="image-grid">
                                <div className="image-main">
                                    <img src={aboutImg1} alt="Hotel lobby" />
                                    <div className="image-overlay">
                                        <span>Luxury Lobby</span>
                                    </div>
                                </div>
                                <div className="image-secondary">
                                    <img src={aboutImg2} alt="Hotel room" />
                                    <div className="image-overlay">
                                        <span>Elegant Rooms</span>
                                    </div>
                                </div>
                                <div className="image-secondary">
                                    <img src={aboutImg3} alt="Hotel dining" />
                                    <div className="image-overlay">
                                        <span>Fine Dining</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="about-stats" ref={counterRef}>
                    <div className="row g-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="col-6 col-md-3">
                                <div className="stat-item">
                                    <div className="stat-number" data-target={stat.value}>
                                        0
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
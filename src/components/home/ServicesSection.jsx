import { useState } from 'react'

const ServicesSection = () => {
    const [ setHoveredIndex] = useState(null)

    const services = [
        {
            icon: 'meditation',
            title: 'Yoga & Meditation',
            description: 'Rejuvenate your body and mind with our expert-led yoga and meditation sessions.',
            features: ['Daily Classes', 'Expert Instructors', 'Peaceful Environment']
        },
        {
            icon: 'dining',
            title: 'Fine Dining',
            description: 'Experience culinary excellence with international cuisine crafted by award-winning chefs.',
            features: ['International Cuisine', 'Award-Winning Chefs', 'Private Dining']
        },
        {
            icon: 'pool',
            title: 'Rooftop Pool',
            description: 'Take a dip in our stunning rooftop infinity pool with panoramic city views.',
            features: ['Infinity Edge', 'Poolside Bar', 'Sun Loungers']
        },
        {
            icon: 'fitness',
            title: 'Fitness Center',
            description: 'Stay active in our state-of-the-art fitness center open 24/7.',
            features: ['Modern Equipment', 'Personal Trainers', '24/7 Access']
        },
        {
            icon: 'event',
            title: 'Event Spaces',
            description: 'Host memorable events in our versatile venues with professional planning.',
            features: ['Multiple Venues', 'Event Planning', 'Catering Services']
        },
        {
            icon: 'wifi',
            title: 'Premium Wi-Fi',
            description: 'Stay connected with high-speed internet access throughout the hotel.',
            features: ['High-Speed', 'Hotel-Wide Coverage', '24/7 Support']
        }
    ]

    // Function to render icons
    const renderIcon = (iconName) => {
        switch(iconName) {
            case 'meditation':
                return (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="2" x2="12" y2="22"></line>
                        <line x1="12" y1="6" x2="20" y2="12"></line>
                        <line x1="12" y1="6" x2="4" y2="12"></line>
                        <line x1="12" y1="18" x2="20" y2="12"></line>
                        <line x1="12" y1="18" x2="4" y2="12"></line>
                    </svg>
                )
            case 'dining':
                return (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                        <path d="M7 2v20"></path>
                        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                    </svg>
                )
            case 'pool':
                return (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 12h20"></path>
                        <path d="M4 16h16"></path>
                        <path d="M6 20h12"></path>
                        <path d="M8 8h8"></path>
                        <path d="M8 4h8"></path>
                        <path d="M12 8v12"></path>
                    </svg>
                )
            case 'fitness':
                return (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 4L4 8l2 4 2-4-2-4z"></path>
                        <path d="M18 4l-2 4 2 4 2-4-2-4z"></path>
                        <path d="M8 12l4 2 4-2"></path>
                        <path d="M12 14v6"></path>
                        <line x1="6" y1="18" x2="18" y2="18"></line>
                    </svg>
                )
            case 'event':
                return (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <circle cx="12" cy="15" r="1"></circle>
                        <circle cx="16" cy="15" r="1"></circle>
                        <circle cx="8" cy="15" r="1"></circle>
                    </svg>
                )
            case 'wifi':
                return (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                        <line x1="12" y1="20" x2="12.01" y2="20"></line>
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <section id="services" className="services-section padding-medium">
            <div className="container" data-aos="fade-up">
                {/* Section Header */}
                <div className="text-center mb-5">
                    <span className="services-subtitle">Premium Amenities</span>
                    <h2 className="display-3 fw-normal mb-3">Our Services & Facilities</h2>
                    <p className="col-lg-7 mx-auto text-muted">
                        Experience world-class hospitality with our comprehensive range of services
                        designed to make your stay unforgettable.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="row g-4">
                    {services.map((service, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div
                                className="service-card"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="service-card-inner">
                                    {/* Icon */}
                                    <div className="service-icon">
                                        {renderIcon(service.icon)}
                                    </div>

                                    {/* Content */}
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>

                                    {/* Features */}
                                    <div className="service-features">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="feature-item">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Button */}
                                    <a href="#" className="service-btn">
                                        Learn More
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection